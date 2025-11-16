import { notFound } from "next/navigation";
import { connectDb } from "@/lib/connectDb";
import { _Blog, _Comments } from "@/Model/Blog";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

import Modal from "./modal";
import CommentForm from "./commentForm";
import CommentsWithReplies from "./commentswithreplies";

export async function generateMetadata({ params }) {
  const { id } = params;

  if (mongoose.connection.readyState === 0) await connectDb();

  if (!mongoose.Types.ObjectId.isValid(id)) notFound();

  const text = await _Blog.findById(id, "title");
  if (!text) notFound();

  return {
    title: text.title,
  };
}

export default async function BlogText({ params }) {
  const { id } = params;

  await connectDb();

  if (!mongoose.Types.ObjectId.isValid(id)) notFound();

  const text = await _Blog.findById(id, "title content createdAt");
  if (!text) notFound();

  const commentsRaw = await _Comments.aggregate([
    { $match: { page: new ObjectId(id) } },
    { $sort: { createdAt: -1 } },
    {
      $lookup: {
        from: "replies",
        let: { commentId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: [
                  { $toString: "$reply" },
                  { $toString: "$$commentId" }
                ]
              }
            }
          }
        ],
        as: "replies"
      }
    }
  ]);

  const commentsWithReplies = commentsRaw.map(comment => ({
    ...comment,
    _id: comment._id.toString(),
    page: comment.page.toString(),
    replies: comment.replies.map(r => ({
      ...r,
      _id: r._id.toString(),
      page: r.page?.toString() ?? null
    }))
  }));

  const safeHTML =
    (text.content || "").replace(
      /<img(.*?)>/g,
      '<img loading="lazy"$1 alt="Blog Image" />'
    );

  return (
    <div className="m-5 object-contain">
      <h1 className="text-xl font-bold m-5 p-1 mx-auto rounded-xl w-50 bg-gray-900 border">
        {text.title}
        <div className="text-sm">
          {text.createdAt.getDate()}/{text.createdAt.getMonth() + 1}/
          {text.createdAt.getFullYear()}
        </div>
      </h1>

      <Modal />

      <div
        className="break-words text-xs sm:text-sm p-5 mx-auto my-5 text-left bg-gray-900 rounded-xl border"
        dangerouslySetInnerHTML={{ __html: safeHTML }}
      />

      <div className="mt-auto">
        <CommentForm pageId={id} />
      </div>

      <CommentsWithReplies comments={commentsWithReplies} pageId={id} />
    </div>
  );
}