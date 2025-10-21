"use client";

import { useState, useEffect, useRef } from "react";
import ReplyButton from "./replybutton";

export default function CommentsWithReplies({ comments, pageId }) {
  const [visibleCount, setVisibleCount] = useState(2);
  const [visibleReplyCount, setVisibleReplyCount] = useState<{
    [key: string]: number;
  }>({});

  const modalRef = useRef<(HTMLDialogElement | null)[]>([]);
  const lastCommentRef = useRef<HTMLDivElement>(null);

  const visibleComments = comments.slice(0, visibleCount);

  const handleVisibleReplyCount = (commentId: string) => {
    setVisibleReplyCount((prev) => ({
      ...prev,
      [commentId]: (prev[commentId] || 2) + 2,
    }));
  };

  const showReplyModal = (index) => {
    modalRef.current[index]?.showModal();
  };
  
  useEffect(() => { 
    if(!lastCommentRef.current)
      return;
    const observer = new IntersectionObserver(
      (ent) => {
        if(ent[0].isIntersecting){
          setVisibleCount((prev) => {
            if(prev < comments.length)
              return prev + 2;
            return prev;
          })
        }
      },
      {
        threshold:1
      }
    )

    observer.observe(lastCommentRef.current);

    return () => {
      if(lastCommentRef.current)
        observer.unobserve(lastCommentRef.current);
    };
  }, [visibleCount, comments.length]);

  return (
    <div>
      {visibleComments.map((comment, index) => {
        const replyVisible = visibleReplyCount[comment._id] || 2;
        const isLastComment = index === visibleComments.length - 1;

        return (
          <div
            key={index}
            className="mx-auto bg-gray-900 rounded-xl mt-5 p-5 text-left border"
            ref={isLastComment ? lastCommentRef : null}
          >
            <div className="font-bold">{comment.author}</div>
            <div className="text-sm">
              {new Date(comment.createdAt).toLocaleString("tr-TR")}
            </div>
            <br />
            {comment.text}
            <div className="my-5">
              <button
                onClick={() => showReplyModal(index)}
                className="btn btn-outline px-4 py-2 rounded mt-4 mx-auto"
              >
                Yanıtla
              </button>

              <dialog
                ref={(el) => {modalRef.current[index] = el}}
                className="modal"
              >
                <div className="modal-box bg-gray-900">
                  <h1 className="text-center m-1">Yanıt Formu</h1>
                  <form
                    action={"../../../api/reply"}
                    className="text-center"
                    method="post"
                  >
                    <textarea
                      className="border text-sm w-50 rounded"
                      name="text"
                      placeholder="Yanıtınızı girin..."
                      required
                    />
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
                      placeholder="E-Postanızı girin..."
                      required
                    />
                    <br />
                    <input
                      type="text"
                      className="border text-sm w-50 rounded"
                      name="author"
                      placeholder="Kullanıcı adınızı girin..."
                      required
                    />
                    <br />
                    <ReplyButton />
                  </form>
                </div>

                <form method="dialog" className="modal-backdrop">
                  <button>Kapat</button>
                </form>
              </dialog>

              {comment.replies.slice(0, replyVisible).map((reply, rIndex) => (
                <div key={rIndex} className="mx-auto border-b my-5">
                  <div className="font-bold">{reply.author}</div>
                  <div className="text-sm mb-5">
                    {new Date(reply.createdAt).toLocaleString("tr-TR")}
                  </div>
                  {reply.text}
                </div>
              ))}

              {replyVisible < comment.replies.length && (
                <button
                  onClick={() => handleVisibleReplyCount(comment._id)}
                  className="btn btn-outline px-4 py-2 rounded mt-4 mx-auto"
                >
                  Daha fazla göster
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
