import mongoose from "mongoose";
import { _Blog, _Comments } from "@/Model/Blog";
import { unstable_cache } from "next/cache";
import { connectDb } from "@/lib/connectDb";

export const getBlogById = (id: string) =>
  unstable_cache(
    async () => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
      }

      await connectDb();
      return _Blog.findById(id).lean();
    },
    ["blog-by-id", id],
    {
      revalidate: 3600,
      tags: ["blog"]
    }
  )();

export const getAllBlogs = unstable_cache(
  async () => {
    await connectDb();
    return _Blog.find().sort({ createdAt: -1 }).lean();
  },
  ["all-blogs"],
  {
    revalidate: 3600,
    tags: ["blog"]
  }
);

export async function getCommentsWithReplies(blogId: string) {
  if (!mongoose.Types.ObjectId.isValid(blogId)) return [];

  await connectDb();

  const commentsRaw = await _Comments.aggregate([
    { $match: { page: new mongoose.Types.ObjectId(blogId) } },
    { $sort: { createdAt: -1 } },
    {
      $lookup: {
        from: "replies",
        let: { commentId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: [{ $toString: "$reply" }, { $toString: "$$commentId" }],
              },
            },
          },
          { $sort: { createdAt: -1 } },
        ],
        as: "replies",
      },
    },
  ]);

  return commentsRaw.map((comment) => ({
    ...comment,
    _id: comment._id.toString(),
    page: comment.page.toString(),
    replies: comment.replies.map((r) => ({
      ...r,
      _id: r._id.toString(),
      page: r.page?.toString() ?? null,
    })),
  }));
}
