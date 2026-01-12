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

  const ipLiked = await redis.sismember(ipKey, ip);

  if (req.cookies.get(cookieKey) || ipLiked) {
    return NextResponse.json({ error: "Zaten like atılmış" }, { status: 409 });
  }

  const likeKey = `like:${type}:${slug}`;
  const likes = await redis.incr(likeKey);

  await redis.sadd(ipKey, ip);
  await redis.expire(ipKey, 60 * 60 * 24 * 30);

  const res = NextResponse.json({ likes });

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
  const likeKey = `like:${type}:${slug}`;
  const likes = await redis.get(likeKey);
  return NextResponse.json({ likes: parseInt(likes || "0", 10) });
}
