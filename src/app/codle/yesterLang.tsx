"use client";

import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function YesterLang() {
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImg = async () => {
      const res = await axios.post("/api/yesterDay");
      setImgUrl(res.data.image);
    };
    fetchImg();
  }, []);

  if (!imgUrl) return null;

  return (
    <Image src={imgUrl} className="h-10" width={300} height={200} alt="" />
  );
}