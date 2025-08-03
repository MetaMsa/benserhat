import LangJson from "../../../../public/lang.json";

export async function POST() {
  const time = new Date("2024-05-23");
  const today = new Date();
  const timestamp = Math.floor((+today - +time) / (1000 * 60 * 60 * 24)) - 1;

  return Response.json(LangJson[timestamp % LangJson.length]);
}
