import { connectDb } from "@/lib/connectDb";
import { _Comments } from "@/Model/Blog";
import { redirect } from "next/navigation";
import crypto from "crypto";

const SECRET_KEY = process.env.HMAC_SECRET || "secret";

export async function POST(req: Request) {
  const commentData = await req.formData();

  await connectDb();

  const commentText = new _Comments({
    text: commentData.get("text"),
    page: commentData.get("page"),
    author: commentData.get("author"),
    email: crypto.createHmac("sha256", SECRET_KEY).update(commentData.get("email")!.toString()!).digest("hex")
  });

  await commentText.save();

  return redirect("/blog/texts/" + commentData.get("page"));
}
