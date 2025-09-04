import { connectDb } from "@/lib/connectDb";
import { _Blog, _Replies } from "@/Model/Blog";
import { _Comments } from "@/Model/Blog";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import Modal from "./modal";
import Button from "./button";
import ReplyButton from "./replybutton";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  await connectDb();

  if (!mongoose.Types.ObjectId.isValid(resolvedParams.id)) return notFound();

  const text = await _Blog.findById(resolvedParams.id);

  if (!text) return notFound();

  return {
    title: text.title,
  };
}

export default async function BlogText({ params }) {
  const resolvedParams = await params;
  await connectDb();

  if (!mongoose.Types.ObjectId.isValid(resolvedParams.id)) return notFound();

  const text = await _Blog.findById(resolvedParams.id);

  if (!text) return notFound();

  const comments = await _Comments
    .find({ page: resolvedParams.id })
    .sort({ createdAt: -1 });

  const replies = await _Replies
    .find({ page: resolvedParams.id })
    .sort({ createdAt: -1 });

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
          __html: text.content.replace(/<img(.*?)>/g, '<img loading="lazy"$1>'),
        }}
      ></div>
      <div className="mt-auto">
        <form
          action="../../../api/comment"
          method="post"
          className="bg-gray-900 w-60 py-5 mx-auto rounded-xl border"
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
          <Button></Button>
        </form>
      </div>
      {comments.map((comment, index) => (
        <div
          key={index}
          className="mx-auto bg-gray-900 rounded-xl mt-5 p-5 text-left border"
        >
          <div className="font-bold">{comment.author}</div>{" "}
          <div className="text-sm">
            {comment.createdAt.getDate() +
              "/" +
              (comment.createdAt.getMonth() + 1) +
              "/" +
              comment.createdAt.getFullYear() +
              " " +
              (comment.createdAt.getUTCHours() + 3) +
              ":" +
              comment.createdAt.getMinutes()}
          </div>{" "}
          <br />
          {comment.text}
          <div className="my-5">
            <form
              action={"../../../api/reply"}
              className="text-left"
              method="post"
            >
              <textarea
                className="border text-sm w-50 rounded"
                name="text"
                placeholder="Yanıtınızı girin"
                required
              />{" "}
              <br />
              <input type="hidden" name="page" value={resolvedParams.id} />
              <input type="hidden" name="reply" value={comment.id} />
              <input
                type="email"
                className="border text-sm w-50 rounded"
                name="email"
                placeholder="E-Postanızı girin"
                required
              />{" "}
              <br />
              <input
                type="text"
                className="border text-sm w-50 rounded"
                name="author"
                placeholder="Kullanıcı adınızı girin"
                required
              />{" "}
              <br />
              <ReplyButton></ReplyButton>
            </form>
            {replies
              .filter(
                (_reply) => _reply.reply.toString() === comment.id.toString()
              )
              .map((_reply, index) => (
                <div key={index} className="mx-auto border-b my-5">
                  <div className="font-bold">{_reply.author}</div>{" "}
                  <div className="text-sm my-5">
                    {_reply.createdAt.getDate() +
                      "/" +
                      (_reply.createdAt.getMonth() + 1) +
                      "/" +
                      _reply.createdAt.getFullYear() +
                      " " +
                      (_reply.createdAt.getUTCHours() + 3) +
                      ":" +
                      _reply.createdAt.getMinutes()}
                  </div>{" "}
                  {_reply.text}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
