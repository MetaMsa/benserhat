"use client";

import axios from "axios";
import { useRef, useState } from "react";

export default function Form() {
  const yearRef = useRef<HTMLDivElement>(null);
  const compiledRef = useRef<HTMLDivElement>(null);
  const cRef = useRef<HTMLDivElement>(null);

  const [tried, setTried] = useState<number>(0);
  const [fetchStatus, setFetchStatus] = useState<string | null>(null);
  const [yearData, setYearData] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [compiledData, setCompiledData] = useState<string | null>(null);
  const [cData, setCData] = useState<string | null>(null);
  const [langName, setLangName] = useState<string>("");

  const [modal, setModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!langName.trim()) return;

    setFetchStatus("Yükleniyor...");

    const res = await axios
      .post("/api/langApi", { name: langName })
      .finally(() => {
        setFetchStatus(null);
      });

    setTried((prev) => prev + 1);

    if (yearRef.current && compiledRef.current && cRef.current) {
      yearRef.current.style.backgroundColor = "";
      compiledRef.current.style.backgroundColor = "";
      cRef.current.style.backgroundColor = "";

      setYearData(null);
      setCompiledData(null);
      setCData(null);
      setFetchStatus(null);
    }

    if (res.data == "Böyle bir dil yok") {
      setFetchStatus(res.data);
      setYear(null);
    } else if (res.data.status == true) {
      if (yearRef.current && compiledRef.current && cRef.current) {
        yearRef.current.style.backgroundColor = "green";
        compiledRef.current.style.backgroundColor = "green";
        cRef.current.style.backgroundColor = "green";

        setYearData(null);
        setYear(res.data.year);
        setCompiledData(res.data.compiled);
        setCData(res.data.c);

        setModal(true);
      }
    } else {
      if (yearRef.current) {
        if (res.data.yearStatus == "true") {
          yearRef.current.style.backgroundColor = "green";
          setYearData("Bu yıl çıkmış başka bir dil");
        } else if (res.data.yearStatus == "old") {
          setYearData("Daha eski bir dil");
        } else if (res.data.yearStatus == "new") {
          setYearData("Daha yeni bir dil");
        }

        setYear(res.data.year);
      }
      if (compiledRef.current) {
        if (res.data.compiledStatus == true)
          compiledRef.current.style.backgroundColor = "green";
        else compiledRef.current.style.backgroundColor = "";

        setCompiledData(res.data.compiled);
      }
      if (cRef.current) {
        if (res.data.cStatus == true)
          cRef.current.style.backgroundColor = "green";
        else cRef.current.style.backgroundColor = "";

        setCData(res.data.c);
      }
    }
  };
  return (
    <div>
      {modal && (
        <dialog className="modal" open>
          <div className="modal-box border bg-gray-900">
            <h3 className="font-bold text-lg">Tebrikler doğru bildiniz</h3>
            <p className="py-4">
              Yeni dil için yarını bekleyin. <br />
              Paylaşmak için: <br />
              <button
                className="btn btn-outline rounded-xl"
                onClick={async () => {
                  const shareData = {
                    title: "CoDle",
                    text:
                      "#Codle# " +
                      "Ben " +
                      tried +
                      " denemede doğru cevaba ulaştım. Peki sen kaç denemede ulaşacaksın? Hemen tıkla ve dene: " +
                      "https://benserhat.com/codle",
                  };
                  if (navigator.share) {
                    await navigator.share(shareData);
                  } else {
                    await navigator.clipboard.writeText(shareData.text);
                    alert("Paylaşma desteklenmiyor, metin panoya kopyalandı.");
                  }
                }}
              >
                Paylaş
                <i className="fa fa-share"></i>
              </button>
            </p>
            <div className="modal-action">
              <button
                className="btn btn-outline rounded-xl"
                onClick={() => location.reload()}
              >
                Tekrar Oyna
              </button>
            </div>
          </div>
        </dialog>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Bir programlama dili giriniz"
          className="input w-50 bg-gray-900"
          value={langName}
          onChange={(e) => setLangName(e.target.value)}
          required
        ></input>{" "}
        <br />
        <button className="btn btn-outline m-5 rounded-xl" type="submit">
          Tahmin Et
        </button>
        <div>{fetchStatus}</div>
      </form>
      <div className="grid grid-cols-1 m-5 sm:grid-cols-3 gap-4">
        <div
          ref={yearRef}
          className="bg-gray-900 rounded-xl h-20 sm:h-50 border"
        >
          Çıkış Yılı
          <div className="my-3 sm:my-15">
            {" "}
            {yearData} {yearData && <br />} {year}
          </div>
        </div>
        <div
          ref={compiledRef}
          className="bg-gray-900 rounded-xl h-20 sm:h-50 border"
        >
          Derlenen/Yorumlanan
          <div className="my-3 sm:my-15">{compiledData}</div>
        </div>
        <div ref={cRef} className="bg-gray-900 rounded-xl h-20 sm:h-50 border">
          C türevi mi?
          <div className="my-3 sm:my-15">{cData}</div>
        </div>
      </div>
    </div>
  );
}
