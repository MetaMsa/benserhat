import { Metadata } from "next";
import Link from "next/link";
//import { getAllBlogs } from "@/lib/services/blog.service";

export const metadata: Metadata = {
  title: "Blog",
  alternates: {
    canonical: "https://benserhat.com/blog",
  }
};

export default async function Blog() {
  //const blogmodel = await getAllBlogs();

  return (
    /*<div>
      <div className="flex justify-center items-center">
        <h1 className="m-5 w-full font-bold bg-gray-900 border rounded-xl p-5">KİŞİSEL BLOG</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-3">
        {(
          blogmodel.map((blog, index) => (
            <Link
              key={index}
              className={"w-50 xl:w-100 mx-auto p-3 bg-gray-900 rounded-xl border border-amber-50"
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
    </div>*/
    <div className="flex justify-center items-center mx-5">
      <div role="alert" className="alert alert-warning">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>Şu anda AWS kaynaklı problemler nedeniyle blog sayfamızın verilerine erişilemiyor. Üzerinde çalışıyoruz. Gelişmelerden haberdar olmak için <Link href={"https://www.linkedin.com/in/mehmet-serhat-aslan-58272b28a/"} className="link">LinkedIn</Link> sayfamızı takip edebilirsiniz.</span>
      </div>
    </div>
  );
}
