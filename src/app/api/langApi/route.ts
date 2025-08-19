import LangJson from "../../../../lang.json";

export async function POST(req: Request) {
  const body = await req.json();

  const match = LangJson.find((item) => item.name === body.name);

  const time = new Date("2024-05-23");
  const today = new Date();
  const timestamp = Math.floor((+today - +time) / (1000 * 60 * 60 * 24));

  const trueLang = LangJson[timestamp % LangJson.length];

  let yearStatus = "";
  const year = match?.year;
  let compiledStatus = false;
  const compiled = match?.compiled;
  let cStatus = false;
  const c = match?.c;

  if (match) {
    if (match.name != trueLang.name) {
      if (trueLang.year == match.year) {
        yearStatus = "true";
      } else if (trueLang.year < match.year) {
        yearStatus = "old";
      } else if (trueLang.year > match.year) {
        yearStatus = "new";
      }
      if (trueLang.compiled == match.compiled) {
        compiledStatus = true;
      }
      if (trueLang.c == match.c) {
        cStatus = true;
      }

      return Response.json({
        yearStatus: yearStatus,
        year: year,
        compiledStatus: compiledStatus,
        compiled: compiled,
        cStatus: cStatus,
        c: c,
        status: false
      });
    } else {
      return Response.json({
        yearStatus: yearStatus,
        year: year,
        compiledStatus: compiledStatus,
        compiled: compiled,
        cStatus: cStatus,
        c: c,
        status: true
      });
    }
  } else {
    return Response.json("Böyle bir dil yok");
  }
}
