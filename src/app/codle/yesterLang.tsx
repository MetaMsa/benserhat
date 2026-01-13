"use client";

import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function YesterLang() {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/api/yesterDay");
      setImgUrl(res.data.image);
      setName(res.data.name);
    };
    fetch();
  }, []);

  if (!imgUrl) return null;

  return (
    <div className="tooltip" data-tip={name}>
      <Image src={imgUrl} className="h-10" width={300} height={200} alt="Yesterday Language Logo" />
    </div>
  );
}
