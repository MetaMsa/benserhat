import { notFound, redirect } from "next/navigation";
import { _Blog } from "@/Model/Blog";
import { _Comments } from "@/Model/Blog";
import { _Replies } from "@/Model/Blog";
import { connectDb } from "@/lib/connectDb";
import { NewsMailSend } from "@/lib/mailSend";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

export async function POST(req: Request) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    notFound();
  }

  try {
    jwt.verify(token, SECRET_KEY!);
  } catch {
    notFound();
  }

  const blogData = await req.formData();

  await connectDb();

  const emailsComment = await _Comments.find();
  const emailsReply = await _Replies.find();

  const emailList = [
    ...emailsComment.map((comment) => ({
      email: comment.email,
      name: comment.author
    })),
    ...emailsReply.map((reply) => ({
      email: reply.email,
      name: reply.author
    })),
  ];

  NewsMailSend(emailList);

  if ((await _Blog.findOne({ title: blogData.get("title") })) == null) {
    const blogText = new _Blog({
      title: blogData.get("title"),
      content: blogData.get("content"),
    });
    await blogText.save();
  } else {
    await _Blog
      .findOne({ title: blogData.get("title") })
      .then(async (_blog) => {
        _blog.content = blogData.get("content");
        await _blog.save();
      });
  }

  return redirect("/blog/" + process.env.URL + "/admin");
}
