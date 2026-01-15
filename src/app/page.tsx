"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Three from "./three";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState<string | number>(Number);

  useEffect(() => {
    axios
      .get("api/yt")
      .then((response) =>
        setData(response.data.items[0].statistics.subscriberCount)
      );
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 mx-5 my-20 p-10 bg-gray-900 rounded-xl border">
      <div>
        <Image
          className="rounded-full mx-auto"
          src="/1761389402143.jpeg"
          width={150}
          height={150}
          alt="Portrait"
        ></Image>
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
          Kocaeli Üniversitesi Bilgisayar Programlama önlisans eğitimimi
          tamamladım; şu anda İstanbul Üniversitesi Web Tasarımı ve Kodlama
          programında öğrenimime devam ediyorum. TRtek Medical Software’deki
          stajımda ASP.NET MVC projeleri geliştirdim. Arc Corp'da FrontEnd
          Developer olarak profesyonel deneyimim oldu. C++, C#, PHP, Node.js,
          Next.js ve React ile proje bazlı deneyimim var. Modern web
          teknolojileriyle ilgileniyorum ve sürekli kendimi geliştirmeye
          çalışıyorum. Portföyümü inceleyebilirsiniz.
        </p>
      </div>
    </div>
  );
}
