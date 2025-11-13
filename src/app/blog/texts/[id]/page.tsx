import { connectDb } from "@/lib/connectDb";
import { _Blog } from "@/Model/Blog";
import { _Comments } from "@/Model/Blog";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import Modal from "./modal";
import CommentForm from "./commentForm";
import CommentsWithReplies from "./commentswithreplies";

export async function generateMetadata({ params }) {
  const { id } = params;
  if (mongoose.connection.readyState === 0) await connectDb();

  if (!mongoose.Types.ObjectId.isValid(id)) return notFound();

  const text = await _Blog.findById(id);

  if (!text) return notFound();

  return {
    title: text.title,
  };
}

export default async function BlogText({ params }) {
  const { id } = params;

  await connectDb();

  if (!mongoose.Types.ObjectId.isValid(id)) return notFound();

  const text = await _Blog.findById(id, "title content createdAt");

  if (!text) return notFound();

  const commentsWithRepliesRaw = await _Comments.aggregate([
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
                $eq: [{ $toString: "$reply" }, { $toString: "$$commentId" }]
              }
            }
          }
        ],
        as: "replies"
      }
    }
  ]);

  const commentsWithReplies = commentsWithRepliesRaw.map(comment => ({
  ...comment,
  _id: comment._id.toString(),
  page: comment.page.toString(),
  replies: comment.replies.map(reply => ({
    ...reply,
    _id: reply._id.toString(),
    page: reply.page?.toString()
  }))
}));

  return (
    <div className="m-5 object-contain">
      <h1 className="text-xl font-bold m-5 p-1 mx-auto rounded-xl w-50 bg-gray-900 border">
        {text.title}{" "}
        <div className="text-sm">
          {text.createdAt.getDate() +
            "/" +
            (text.createdAt.getMonth() + 1) +
            "/" +
            text.createdAt.getFullYear()}
        </div>
      </h1>
      <Modal></Modal>
      <div
        className="break-words text-xs sm:text-sm p-5 mx-auto my-5 text-left bg-gray-900 rounded-xl border"
        dangerouslySetInnerHTML={{
          __html: text.content.replace(/<img(.*?)>/g, '<img loading="lazy"$1 alt="Blog Image" />'), // lazy load ve alt text
        }}
      ></div>
      <div className="mt-auto">
        <CommentForm pageId={id}></CommentForm>
      </div>
      <CommentsWithReplies comments={commentsWithReplies} pageId={id}></CommentsWithReplies>
    </div>
  );
}
