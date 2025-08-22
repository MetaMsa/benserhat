import { redirect } from "next/navigation";
import { _Blog } from "@/Model/Blog";
import { connectDb } from "@/lib/connectDb";

export async function POST(req: Request) {
  const blogData = await req.formData();

  await connectDb();

  if ((await _Blog.findOne({ title: blogData.get("title") })) == null) {
    const blogText = new _Blog({
      title: blogData.get("title"),
      content: blogData.get("content"),
    });
    await blogText.save();  
  } else {
    await _Blog.findOne({ title: blogData.get("title")}).then( async (_blog) => {
        _blog.content = blogData.get("content");
        await _blog.save();
    })
  }

  return redirect("/blog/" + process.env.URL + "/admin");
}
