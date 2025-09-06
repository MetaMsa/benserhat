"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Modal() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const status = searchParams.get("status");
  const modalRef = useRef<HTMLDialogElement>(null);
  const statusMessage = useRef<HTMLParagraphElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (status === "success") {
      statusMessage.current!.innerHTML = "Yorumunuz başarıyla kaydedildi.";
      modalRef.current?.showModal();
    } else if (status === "error") {
      statusMessage.current!.innerHTML = 'Yorumunuz kaydedilemedi! <br> Lütfen tüm alanları doğru doldurduğunuzdan emin olun.';
      modalRef.current?.showModal();
    }
  }, [status]);

  const refreshWithoutParam = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("status");

    router.replace(pathname + (params.toString() ? "?" + params : ""), {
      scroll: false,
    });
  };

  return (
    <div>
      <dialog ref={modalRef} id="status_modal" className="modal">
        <div className="modal-box bg-gray-900">
          <p className="py-4" ref={statusMessage}></p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-outline rounded-xl" onClick={refreshWithoutParam}>
                Kapat
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
