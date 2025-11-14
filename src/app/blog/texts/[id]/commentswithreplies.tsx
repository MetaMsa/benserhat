"use client";

import { useState, useEffect, useRef } from "react";

type Reply = {
  _id?: string;
  author?: string;
  createdAt?: string;
  text?: string;
};

type Comment = {
  _id?: string;
  author?: string;
  createdAt?: string;
  text?: string;
  replies?: Reply[];
};

interface CommentsWithRepliesProps {
  comments?: Comment[];
  pageId?: string;
}

export default function CommentsWithReplies({
  comments,
  pageId,
}: CommentsWithRepliesProps) {
  const [disabled, setDisabled] = useState(false);
  const [visibleCount, setVisibleCount] = useState(2);
  const [visibleReplyCount, setVisibleReplyCount] = useState<{
    [key: string]: number;
  }>({});

  const modalRef = useRef<(HTMLDialogElement | null)[]>([]);
  const lastCommentRef = useRef<HTMLDivElement>(null);

  const visibleComments = (comments ?? []).slice(0, visibleCount);
  const totalComments = comments?.length ?? 0;

  const handleVisibleReplyCount = (commentId?: string) => {
    if (!commentId) return;

    setVisibleReplyCount((prev) => ({
      ...prev,
      [commentId]: (prev[commentId] || 2) + 2,
    }));
  };

  const showReplyModal = (index: number) => {
    modalRef.current[index]?.showModal();
  };

  useEffect(() => {
    const currentTarget = lastCommentRef.current;
    if (!currentTarget) return;

    const observer = new IntersectionObserver(
      (ent) => {
        if (ent[0].isIntersecting) {
          setVisibleCount((prev) => {
            if (prev < totalComments) return prev + 2;
            return prev;
          });
        }
      },
      { threshold: 1 }
    );

    observer.observe(currentTarget);

    return () => {
      observer.unobserve(currentTarget);
    };
  }, [visibleCount, totalComments]);

  return (
    <div>
      {visibleComments.map((comment, index) => {
        const replyVisible = visibleReplyCount[comment?._id] || 2;
        const isLastComment = index === visibleComments.length - 1;
        const replies = Array.isArray(comment?.replies) ? comment.replies : [];

        return (
          <div
            key={comment?._id ?? index}
            className="mx-auto bg-gray-900 rounded-xl mt-5 p-5 text-left border"
            ref={isLastComment ? lastCommentRef : null}
          >
            <div className="font-bold">{String(comment?.author ?? "")}</div>
            <div className="text-sm">
              {comment?.createdAt
                ? new Date(comment.createdAt).toLocaleString("tr-TR")
                : ""}
            </div>
            <br />
            {String(comment?.text ?? "")}

            <div className="my-5">
              <button
                onClick={() => showReplyModal(index)}
                className="btn btn-outline px-4 py-2 rounded mt-4 mx-auto"
              >
                Yanıtla
              </button>

              <dialog
                ref={(el) => {
                  modalRef.current[index] = el;
                }}
                className="modal"
              >
                <div className="modal-box bg-gray-900">
                  <h1 className="text-center m-1">Yanıt Formu</h1>
                  <form
                    action="../../../api/reply"
                    className="text-center"
                    method="post"
                    onSubmit={() => {
                      setDisabled(true);
                    }}
                  >
                    <textarea
                      className="border text-sm w-50 rounded"
                      name="text"
                      placeholder="Yanıtınızı girin..."
                      required
                    />
                    <br />
                    <input type="hidden" name="page" value={pageId ?? ""} />
                    <input
                      type="hidden"
                      name="reply"
                      value={comment?._id?.toString() ?? ""}
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
                    <button
                      className="btn btn-outline mt-3 rounded"
                      type="submit"
                      disabled={disabled}
                    >
                      Gönder
                    </button>
                  </form>
                </div>

                <form method="dialog" className="modal-backdrop">
                  <button>Kapat</button>
                </form>
              </dialog>

              {replies.slice(0, replyVisible).map((reply, rIndex) => (
                <div
                  key={reply?._id ?? rIndex}
                  className="mx-auto border-b my-5"
                >
                  <div className="font-bold">{String(reply?.author ?? "")}</div>
                  <div className="text-sm mb-5">
                    {reply?.createdAt
                      ? new Date(reply.createdAt).toLocaleString("tr-TR")
                      : ""}
                  </div>
                  {String(reply?.text ?? "")}
                </div>
              ))}

              {replyVisible < replies.length && (
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
