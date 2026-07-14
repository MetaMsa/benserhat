"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Three from "./three";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState<string | number>(0);

  useEffect(() => {
    axios
      .get("/api/yt")
      .then((response) =>
        setData(response.data.items[0].statistics.subscriberCount)
      );
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-5 my-20 p-10 bg-base-300 rounded-xl border">
      <div>
        <Image
          className="rounded-full mx-auto"
          src="/portrait.jpeg"
          width={150}
          height={150}
          alt="Portrait"
        />
      </div>
      <div className="w-full" title="Mehmet Serhat ASLAN">
        <Three />
      </div>
      <div className="col-span-1 sm:col-span-2 md:col-span-1 my-10">
        <p className="text-center">
          Youtube Abone Sayacı: {data} <br />
          <progress
            className="progress progress-accent w-20"
            {...(Number(data) && { value: Number(data) })}
            max="10"
          ></progress>
        </p>
      </div>
      <div className="col-span-1 sm:col-span-2 md:col-span-3">
        <p className="text-center text-xs md:text-sm"> 
        Küçük yaşlardan beri yazılımla ilgilenmekteyim. Üniversite
        tercihimi de bu yönde yaptım. Üniversite ve staj döneminde
        web alanına kaydım. Hem Frontend hem Backend deneyimim
        var. Full Stack Developer olarak bir kariyer inşa etme
        niyetindeyim. Portföyümü inceleyebilirsiniz.
        </p>
      </div>
    </div>
  );
}
