import { notFound } from "next/navigation";
import LikeButton from "@/app/components/LikeButton";

import Modal from "./modal";
import CommentForm from "./commentForm";
import CommentsWithReplies from "./commentswithreplies";
import Sanitized from "./sanitized";

import {
  getBlogById,
  getCommentsWithReplies,
} from "@/lib/services/blog.service";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const text = await getBlogById(id);

  if (!text || Array.isArray(text)) {
    return notFound();
  }

  return {
    title: text.title,
  };
}

export default async function BlogText({ params }) {
  const { id } = await params;

  const text = await getBlogById(id);
  if (!text || Array.isArray(text)) notFound();

  const commentsWithReplies = await getCommentsWithReplies(id);

  const HTML = (text.content || "").replace(
    /<img(.*?)>/g,
    '<img loading="lazy"$1 alt="Blog Image" />',
  );

  return (
    <div className="m-5 object-contain">
      <h1 className="text-xl font-bold m-5 p-1 mx-auto rounded-xl w-50 bg-gray-900 border">
        {text.title}
        <div className="text-sm">
          {new Date(text.createdAt).toLocaleDateString()}
        </div>
      </h1>

      <Modal />

      <Sanitized html={HTML} />

      <div className="flex justify-end mb-5">
        <LikeButton type={"blog"} slug={id} />
      </div>

      <div className="mt-auto">
        <CommentForm pageId={id} />
      </div>

      <CommentsWithReplies comments={commentsWithReplies} pageId={id} />
    </div>
  );
}
