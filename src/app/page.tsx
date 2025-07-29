"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Three from "./three";

export default function Home() {
  const [data, setData] = useState<string | number>(Number);

  useEffect(() => {
    fetch("api/yt")
      .then((response) => response.json())
      .then((data) => (setData(data.items[0].statistics.subscriberCount)));
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 m-10 p-10 bg-gray-900 rounded-xl">
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
            className="progress w-20"
            value={data}
            max="10"
          ></progress>
        </p>
      </div>
      <div className="col-span-1 sm:col-span-2 md:col-span-3">
        <p className="text-center">
          Kocaeli Üniversitesi’nde Bilgisayar Programlama eğitimi alıyorum ve aynı zamanda İstanbul Üniversitesi’nde Web Tasarımı ve Kodlama alanlarında öğrenimime devam ediyorum. Akademik çalışmalarım sırasında C++, PHP, Laravel, Node.js ve Express.js gibi dillerle projeler geliştirdim. Bootstrap kullanarak responsive web tasarımlar oluşturmayı öğrendim ve Asp.Net MVC ile staj deneyimi yaşadım. 

Görüntü işleme üzerine OpenCV ile çalışarak teknik becerilerimi ilerlettim ve Adobe ürünleri ile Blender kullanarak 2D ve 3D tasarım alanlarında uygulamalar gerçekleştirdim. Kariyerimde yazılım geliştirme ve tasarım odaklı projelerde yer almayı hedefliyorum ve bu doğrultuda hem teknik hem de yaratıcı becerilerimi geliştirmeye devam ediyorum.
        </p>
      </div>
    </div>
  );
}
