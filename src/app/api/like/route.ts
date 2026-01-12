import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { rateLimit } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
  const { slug, type } = await req.json();

  if (!slug) {
    return NextResponse.json({ error: "slug yok" }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

  if (!(await rateLimit(ip))) {
    return NextResponse.json(
      { error: "Çok fazla istek yapıldı" },
      { status: 429 }
    );
  }

  const cookieKey = `liked_${slug}`;
  if (req.cookies.get(cookieKey)) {
    return NextResponse.json({ error: "Zaten like atılmış" }, { status: 409 });
  }

  const likeKey = `like:${type}:${slug}`;
  const likes = await redis.incr(likeKey);

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
