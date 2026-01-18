import { connectDb } from "@/lib/connectDb";
import { _Comments } from "@/Model/Blog";
import { redirect } from "next/navigation";
import { rateLimit } from "@/lib/ratelimit";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const commentData = await req.formData();

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  
  if (!(await rateLimit(ip))) {
    return NextResponse.json(
      { error: "Çok fazla istek yapıldı" },
      { status: 429 }
    );
  }

  if (
    !commentData.get("text") ||
    !commentData.get("page") ||
    !commentData.get("author") ||
    !commentData.get("email") ||
    !commentData.get("email")?.toString().includes("@") ||
    !commentData.get("email")?.toString().includes(".")
  ) {
    return redirect("/blog/texts/" + commentData.get("page") + "?status=error");
  }

  await connectDb();

  const commentText = new _Comments({
    text: commentData.get("text"),
    page: commentData.get("page"),
    author: commentData.get("author"),
    email: commentData.get("email"),
  });

  await commentText.save();

  return redirect("/blog/texts/" + commentData.get("page") + "?status=success");
}
