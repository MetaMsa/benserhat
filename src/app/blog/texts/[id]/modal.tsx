"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Modal() {
  const searchParams = useSearchParams();
    const pathname = usePathname();
  const status = searchParams.get("status");
  const modalRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (status === "success") {
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
      <dialog ref={modalRef} id="success_modal" className="modal">
        <div className="modal-box">
          <p className="py-4">
            Yorumunuz başarıyla kaydedildi.
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={refreshWithoutParam}>Kapat</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
