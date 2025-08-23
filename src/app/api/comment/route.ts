import { connectDb } from "@/lib/connectDb";
import { _Comments } from "@/Model/Blog";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
  const commentData = await req.formData();

  if(!commentData.get("text") || !commentData.get("page") || !commentData.get("author") || !commentData.get("email") || !commentData.get("email")?.toString().includes("@") || !commentData.get("email")?.toString().includes("."))
  {
    return redirect("/blog/texts/" + commentData.get("page") + "?status=error");
  }

  await connectDb();

  const commentText = new _Comments({
    text: commentData.get("text"),
    page: commentData.get("page"),
    author: commentData.get("author"),
    email: commentData.get("email")
  });

  await commentText.save();

  return redirect("/blog/texts/" + commentData.get("page") + "?status=success");
}
