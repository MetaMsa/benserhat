import { notFound } from "next/navigation";
import LikeButton from "@/app/components/LikeButton";

import Modal from "./modal";
import CommentForm from "./commentForm";
import CommentsWithReplies from "./commentswithreplies";

import {
  getBlogById,
  getCommentsWithReplies,
} from "@/lib/services/blog.service";
import { sanitizeHTML } from "@/lib/sanitize";

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

  const safeHTML = sanitizeHTML(HTML);

  return (
    <div className="m-5 object-contain">
      <h1 className="text-xl font-bold m-5 p-1 mx-auto rounded-xl w-50 bg-gray-900 border">
        {text.title}
        <div className="text-sm">
          {new Date(text.createdAt).toLocaleDateString()}
        </div>
      </h1>

      <Modal />

      <div
        className="break-words text-xs sm:text-sm p-5 mx-auto my-5 text-left bg-gray-900 rounded-xl border"
        dangerouslySetInnerHTML={{ __html: safeHTML }}
      />

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
