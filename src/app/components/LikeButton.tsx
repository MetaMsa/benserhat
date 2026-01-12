"use client";

import { useEffect, useState } from "react";

export default function LikeButton({ slug, type }: { slug: number, type: string }) {
  const [likes, setLikes] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    async function fetchLikes() {
      const res = await fetch(`/api/like?type=${type}&slug=${slug}`);
      if (res.ok) {
        const data = await res.json();
        setLikes(data.likes);
      }
    }
    fetchLikes();
  }, [type, slug]);

  const handleLike = async () => {
    if (liked) return;
    const res = await fetch("/api/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug, type }),
    });

    if (res.ok) {
      const data = await res.json();
      setLikes(data.likes);
      setLiked(true);
    }
  };

  return (
    <button onClick={handleLike} className="btn btn-ghost">
        <i className="fa fa-thumbs-up"></i> {likes ?? 0}
    </button>
  );
}
