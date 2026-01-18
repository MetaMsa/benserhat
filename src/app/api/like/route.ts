import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { rateLimit } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
  const { slug, type } = await req.json();

  if (!slug || !type) {
    return NextResponse.json({ error: "slug veya type yok" }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!(await rateLimit(ip))) {
    return NextResponse.json(
      { error: "Çok fazla istek yapıldı" },
      { status: 429 }
    );
  }

  const cookieKey = `liked_${type}_${slug}`;
  const ipKey = `like:ip:${type}:${slug}`;

  const alreadyLiked =
    req.cookies.get(cookieKey) || (await redis.sismember(ipKey, ip));

  if (alreadyLiked) {
    return NextResponse.json({});
  }

  const likeKey = `like:${type}:${slug}`;
  await redis.incr(likeKey);

  await redis.sadd(ipKey, ip);
  await redis.expire(ipKey, 60 * 60 * 24 * 365);

  const res = NextResponse.json({});

  res.cookies.set(cookieKey, "1", {
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: true,
    sameSite: "lax",
  });

  return res;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const type = searchParams.get("type");

  if (!slug || !type) {
    return NextResponse.json({ error: "slug veya type yok" }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const likeKey = `like:${type}:${slug}`;
  const ipKey = `like:ip:${type}:${slug}`;
  const cookieKey = `liked_${type}_${slug}`;

  const [likes, ipLiked] = await Promise.all([
    redis.get(likeKey),
    redis.sismember(ipKey, ip),
  ]);

  const cookieLiked = req.cookies.get(cookieKey);

  const liked = Boolean(cookieLiked || ipLiked);

  return NextResponse.json({ likes: parseInt(likes || "0", 10), liked });
}

export async function DELETE(req: NextRequest) {
  const { slug, type } = await req.json();

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!(await rateLimit(ip))) {
    return NextResponse.json(
      { error: "Çok fazla istek yapıldı" },
      { status: 429 }
    );
  }

  if (!slug || !type || !ip) {
    return NextResponse.json(
      { error: "slug, type veya ip yok" },
      { status: 400 }
    );
  }

  const likeKey = `like:${type}:${slug}`;
  const ipKey = `like:ip:${type}:${slug}`;

  const current = parseInt((await redis.get(likeKey)) || "0", 10);

  const hasLiked = await redis.sismember(ipKey, ip);

  if (hasLiked && current > 0) {
    await redis.decr(likeKey);
    await redis.srem(ipKey, ip);
  }

  const res = NextResponse.json({});

  const cookieKey = `liked_${type}_${slug}`;
  res.cookies.delete(cookieKey);

  return res;
}
