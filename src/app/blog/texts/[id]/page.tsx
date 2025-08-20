import { connectDb } from "@/lib/connectDb";
import { _Blog } from "@/Model/Blog";
import { _Comments } from "@/Model/Blog";
import { notFound } from "next/navigation";
import mongoose from "mongoose";

export default async function BlogText({ params }) {
  const resolvedParams = await params;

  await connectDb();

  if (!mongoose.Types.ObjectId.isValid(resolvedParams.id)) return notFound();

  const text = await _Blog.findById(resolvedParams.id);

  if (!text) return notFound();

  const comments = await _Comments.find({ page: resolvedParams.id });

  return (
    <div className="m-5 object-contain">
      <h1 className="text-xl font-bold m-5 p-1 mx-auto rounded-xl w-50 bg-gray-900">
        {text.title}{" "}
        <div className="text-sm">
          {text.createdAt.getDate() +
            "/" +
            (text.createdAt.getMonth() + 1) +
            "/" +
            text.createdAt.getFullYear()}
        </div>
      </h1>
      <div
        className="break-words p-10 m-10 text-left bg-gray-900 rounded-xl"
        dangerouslySetInnerHTML={{ __html: text.content }}
      ></div>
      <div className="mt-auto">
        <form
          action="../../../api/comment"
          method="post"
          className="bg-gray-900 w-60 py-5 mx-auto rounded-xl"
        >
          <textarea
            className="border text-sm w-50 rounded"
            placeholder="Yorumunuzu girin..."
            name="text"
            required
          ></textarea>{" "}
          <br />
          <input
            className="border text-sm w-50 rounded"
            type="email"
            name="email"
            placeholder="E-Postanızı girin..."
            required
          />{" "}
          <br />
          <input
            className="border text-sm w-50 rounded"
            type="text"
            name="author"
            placeholder="Kullanıcı adınızı girin..."
            required
          />{" "}
          <br />
          <input type="hidden" name="page" value={resolvedParams.id} />
          <button type="submit" className="btn btn-outline mt-1">
            Yorum Gönder
          </button>
        </form>
      </div>
      {comments.map((comment, index) => (
        <div
          key={index}
          className="mx-50 bg-gray-900 rounded-xl mt-5 p-5 text-left"
        >
          <div className="font-bold">{comment.author}</div>{" "}
          <div className="text-sm">
            {comment.createdAt.getDate() +
              "/" +
              comment.createdAt.getMonth() +
              "/" +
              comment.createdAt.getFullYear() +
              " " +
              (comment.createdAt.getUTCHours() + 3) +
              ":" +
              comment.createdAt.getMinutes()}
          </div>{" "}
          <br />
          {comment.text}
        </div>
      ))}
    </div>
  );
}
