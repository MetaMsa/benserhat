"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Three from "./three";

export default function Home() {
  const [data, setData] = useState<string | number>(Number);

  useEffect(() => {
    fetch("api/yt")
      .then((response) => response.json())
      .then((data) => setData(data.items[0].statistics.subscriberCount));
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 mx-5 my-20 p-10 bg-gray-900 rounded-xl border">
      <div>
        <Image
          className="rounded-xl mx-auto"
          src="/3b584ae8-d108-4483-85db-d8c79c29d2ce.jpg"
          width={100}
          height={100}
          alt=""
        ></Image>
      </div>
      <div className="w-full">
        <Three />
      </div>
      <div className="col-span-1 sm:col-span-2 md:col-span-1 my-10">
        <p className="text-center">
          Youtube Abone Sayacı: {data} <br />
          <progress
            className="progress progress-accent w-20"
            value={data}
            max="10"
          ></progress>
        </p>
      </div>
      <div className="col-span-1 sm:col-span-2 md:col-span-3">
        <p className="text-center text-xs md:text-sm">
          Kocaeli Üniversitesi Bilgisayar Programlama Ön Lisans eğitimimi
          tamamladım; şu anda İstanbul Üniversitesi Web Tasarımı ve Kodlama
          programında öğrenimime devam ediyorum. Eğitim sürecimde veri mimarisi,
          veritabanı geliştirme ve yönetimi konularında güçlü bir temel edindim.
          TRtek Medical Software’de yaptığım stajda, ASP.NET MVC tabanlı web
          projelerinin geliştirilmesine katkı sağladım. Proje bazlı çalışmalarda
          C++, C#, PHP, Node.js, Next.js ve React teknolojileriyle deneyim
          kazandım. Ayrıca OpenCV ile görüntü işleme üzerine çalışarak teknik
          becerilerimi çeşitlendirdim. Hedefim, yazılım geliştirme ve tasarım
          odaklı projelerde, yaratıcı bakış açımı teknik uzmanlıkla
          birleştirerek değer üretmek.
        </p>
      </div>
    </div>
  );
}
