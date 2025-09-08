"use client";

import { useState } from "react";
import ReplyButton from "./replybutton";

export default function CommentsWithReplies({ comments, pageId }) {
  const [visibleCount, setVisibleCount] = useState(2);

  const visibleComments = comments.slice(0, visibleCount);

  return (
    <div>
      {visibleComments.map((comment, index) => (
        <div
          key={index}
          className="mx-auto bg-gray-900 rounded-xl mt-5 p-5 text-left border"
        >
          <div className="font-bold">{comment.author}</div>{" "}
          <div className="text-sm">
            {new Date(comment.createdAt).toLocaleString("tr-TR")}
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
              <input type="hidden" name="page" value={pageId} />
              <input
                type="hidden"
                name="reply"
                value={comment._id.toString()}
              />
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
            {comment.replies.map((reply, rIndex) => (
              <div key={rIndex} className="mx-auto border-b my-5">
                <div className="font-bold">{reply.author}</div>{" "}
                <div className="text-sm mb-5">
                  {new Date(reply.createdAt).toLocaleString("tr-TR")}
                </div>{" "}
                {reply.text}
              </div>
            ))}
          </div>
        </div>
      ))}
            {
                visibleCount < comments.length && (
                    <button onClick={() => setVisibleCount(visibleCount + 2)} className="btn btn-outline px-4 py-2 rounded mt-4 mx-auto block">
                        Daha fazla yükle
                    </button>
                )
            }
    </div>
  );
}
