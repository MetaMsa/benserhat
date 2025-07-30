import { Metadata } from "next";
import Image from "next/image";
import ClientForm from "./form";
import LangJson from "../../../public/lang.json";

export const metadata: Metadata = {
  title: "CoDle",
};

export default function Codle() {
  const time = new Date("2024-05-23");
  const today = new Date();
  const timestamp = Math.floor((+today - +time) / (1000 * 60 * 60 * 24)) - 1;
  const image = LangJson[timestamp % LangJson.length].image;
  
  return (
    <div className="text-center">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="Adsız-tasarım.svg"
          className="h-20"
          width={300}
          height={200}
          alt=""
        ></Image>
      </div>
      <ClientForm></ClientForm>
      <div className="flex flex-col items-center justify-center bg-gray-900 mx-auto mb-5 rounded-xl w-30">
        <div className="my-1">
          <Image
          src={image}
          className="h-10"
          width={300}
          height={200}
          alt=""
          >

          </Image>
        </div>
        <div>Önceki Günün Dili</div>
      </div>
    </div>
  );
}
