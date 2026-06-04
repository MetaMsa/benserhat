import { Metadata } from "next";
import Link from "next/link";
import { getAllBlogs } from "@/lib/services/blog.service";

export const metadata: Metadata = {
  title: "Blog",
  alternates: {
    canonical: "https://benserhat.com/blog",
  }
};

export default async function Blog() {
  const blogmodel = await getAllBlogs();

  return (
  <div>
      <div className="flex justify-center items-center">
        <h1 className="m-5 w-full font-bold bg-base-300 border rounded-xl p-5">KİŞİSEL BLOG</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-3">
        {(
          blogmodel.map((blog, index) => (
            <Link
              key={index}
              className={"w-50 xl:w-100 mx-auto p-3 bg-base-300 rounded-xl border border-base-content"
              }
              href={"/blog/texts/" + blog._id}
              target="_blank"
            >
              <h1 className="font-extrabold">{blog.title}</h1>
              <div className="truncate">{blog.content.replace(/<[^>]+>/g, "")}</div>
              <h2 className="text-sm">{new Date(blog.createdAt).toLocaleDateString("tr-TR")}</h2>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
