"use client";

import { useEffect, useState } from "react";

export default function LikeButton({ slug, type }: { slug: number, type: string }) {
  const [likes, setLikes] = useState<number | null>(null);
  const [liked, setLiked] = useState<boolean>(false);

  const fetchLikes = async () => {
    const res = await fetch(`/api/like?type=${type}&slug=${slug}`);
    if (res.ok) {
      const data = await res.json();
      setLikes(data.likes);
      setLiked(data.liked);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [type, slug]);

  const handleLike = async () => {
    const method = liked ? "DELETE" : "POST";

    const res = await fetch("/api/like", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug, type }),
    });

    if (res.ok) {
      fetchLikes();
    }
  };

  return (
    <button onClick={handleLike} className="btn btn-ghost">
        <i className={`fa${liked ? "" : "-regular"} fa-thumbs-up`}></i> {likes ?? 0}
    </button>
  );
}
