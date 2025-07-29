"use client";

import axios from "axios";
import { useRef } from "react";

export default function Form() {
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLButtonElement>(null);
  const copyRef = useRef<HTMLButtonElement>(null);

  const yearRef = useRef<HTMLDivElement>(null);
  const compiledRef = useRef<HTMLDivElement>(null);
  const cRef = useRef<HTMLDivElement>(null);

  const yearRefData = useRef<HTMLDivElement>(null);
  const compiledRefData = useRef<HTMLDivElement>(null);
  const cRefData = useRef<HTMLDivElement>(null);

  let tried = 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const langName = inputRef.current?.value.toLocaleLowerCase().trim();
    const res = await axios.post("/api/langApi", { name: langName });

    tried++;

    if (
      yearRef.current &&
      compiledRef.current &&
      cRef.current &&
      yearRefData.current &&
      compiledRefData.current &&
      cRefData.current &&
      divRef.current
    ) {
      yearRef.current.style.backgroundColor = "";
      compiledRef.current.style.backgroundColor = "";
      cRef.current.style.backgroundColor = "";

      yearRefData.current.innerHTML = "";
      compiledRefData.current.innerHTML = "";
      cRefData.current.innerHTML = "";
      divRef.current.innerHTML = "";
    }

    if (res.data == "Böyle bir dil yok") {
      if (divRef.current) {
        divRef.current.innerHTML = res.data;
      }
    } else if (res.data.status == true) {
      if (
        yearRef.current &&
        compiledRef.current &&
        cRef.current &&
        yearRefData.current &&
        compiledRefData.current &&
        cRefData.current
      ) {
        yearRef.current.style.backgroundColor = "green";
        compiledRef.current.style.backgroundColor = "green";
        cRef.current.style.backgroundColor = "green";

        yearRefData.current.innerHTML = res.data.year;
        compiledRefData.current.innerHTML = res.data.compiled;
        cRefData.current.innerHTML = res.data.c;
      }
      modalRef.current?.click();
    } else {
      if (yearRef.current) {
        if (res.data.yearStatus == "true") {
          yearRef.current.style.backgroundColor = "green";
          if (yearRefData.current)
            yearRefData.current.innerHTML = "Bu yıl çıkmış başka bir dil";
        } else if (res.data.yearStatus == "old") {
          if (yearRefData.current)
            yearRefData.current.innerHTML = "Daha eski bir dil";
        } else if (res.data.yearStatus == "new") {
          if (yearRefData.current)
            yearRefData.current.innerHTML = "Daha yeni bir dil";
        }

        if (yearRefData.current?.innerHTML)
          yearRefData.current.innerHTML += "<br/>" + res.data.year;
      }
      if (compiledRef.current) {
        if (res.data.compiledStatus == true)
          compiledRef.current.style.backgroundColor = "green";
        else compiledRef.current.style.backgroundColor = "";

        if (compiledRefData.current)
          compiledRefData.current.innerHTML = res.data.compiled;
      }
      if (cRef.current) {
        if (res.data.cStatus == true)
          cRef.current.style.backgroundColor = "green";
        else cRef.current.style.backgroundColor = "";

        if (cRefData.current) cRefData.current.innerHTML = res.data.c;
      }
    }
  };
  return (
    <div>
      <button
        ref={modalRef}
        className="btn hidden"
        onClick={() => {
          const modal = document.getElementById(
            "success_modal"
          ) as HTMLDialogElement | null;
          modal?.showModal();
        }}
      >
        modal
      </button>
      <dialog id="success_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tebrikler doğru bildiniz</h3>
          <p className="py-4">
            Yeni dil için yarını bekleyin. <br />
            Paylaşmak için: <br />
            <button
              className="btn btn-"
              onClick={() => {
                const copyText = "#Codle# " 
                  + "Ben " +
                  tried + 
                  " denemede doğru cevaba ulaştım. Peki sen kaç denemede ulaşacaksın? Hemen tıkla ve dene: " + "https://benserhat.live/codle";
                
                navigator.clipboard.writeText(copyText);

                if(copyRef.current)
                  copyRef.current.innerHTML = "Kopyalandı";
              }}
              ref={copyRef}
            >
              Paylaş
              <i className="fa fa-share"></i>
            </button>
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={() => location.reload()}>
                Tekrar Oyna
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Bir programlama dili giriniz"
          className="input w-50 input-neutral"
          ref={inputRef}
          required
        ></input>{" "}
        <br />
        <button className="btn btn-outline m-5 rounded-xl" type="submit">
          Tahmin Et
        </button>
        <div ref={divRef}></div>
      </form>
      <div className="grid grid-cols-1 m-5 sm:grid-cols-3 gap-4">
        <div ref={yearRef} className="bg-gray-900 rounded-xl h-20 sm:h-50">
          Çıkış Yılı
          <div className="my-3 sm:my-15" ref={yearRefData}></div>
        </div>
        <div ref={compiledRef} className="bg-gray-900 rounded-xl h-20 sm:h-50">
          Derlenen/Yorumlanan
          <div className="my-3 sm:my-15" ref={compiledRefData}></div>
        </div>
        <div ref={cRef} className="bg-gray-900 rounded-xl h-20 sm:h-50">
          C türevi mi?
          <div className="my-3 sm:my-15" ref={cRefData}></div>
        </div>
      </div>
    </div>
  );
}
