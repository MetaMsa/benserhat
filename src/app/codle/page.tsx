import { Metadata } from "next";
import Image from "next/image";
import ClientForm from "./form";
import YesterLang from "./yesterLang";

export const metadata: Metadata = {
  title: "CoDle",
};

export default function Codle() {
  return (
    <div className="text-center">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="Adsız-tasarım.svg"
          className="h-20"
          width={300}
          height={200}
          alt="Codle Logo"
        ></Image>
      </div>
      <ClientForm></ClientForm>
      <div className="flex flex-col items-center justify-center bg-gray-900 mx-auto mb-5 rounded-xl w-32 border">
        <div className="my-1">
          <YesterLang></YesterLang>
          <div>Önceki Günün Dili</div>
        </div>
      </div>
    </div>
  );
}
