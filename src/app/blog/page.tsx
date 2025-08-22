import { Metadata } from "next";
import { connectDb } from "@/lib/connectDb";
import {_Blog} from "@/Model/Blog";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function Blog() {
  await connectDb();
  const blogmodel = await _Blog.find().sort({ createdAt: -1 });
  return (
    <div>
      <div className="flex justify-center items-center">
        <h1 className="m-5 font-bold bg-gray-900 border rounded-xl p-5">KİŞİSEL BLOG</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-3">
        {(
          blogmodel.map((blog, index) => (
            <Link
              key={index}
              className={"w-50 xl:w-100 mx-auto p-3 bg-gray-900 rounded-xl border border-amber-50"
              }
              href={"/blog/texts/" + blog._id}
            >
              <h1 className="font-extrabold">{blog.title}</h1>
              <div className="truncate">{blog.content.replace(/<[^>]+>/g, "")}</div>
              <h2 className="text-sm">{blog.createdAt.getDate() + "/" + (blog.createdAt.getMonth() + 1) + "/" + blog.createdAt.getFullYear()}</h2>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
