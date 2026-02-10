"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Modal() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const status = searchParams.get("status");
  const router = useRouter();

  const statusMessage: string | null =
    status === "success"
      ? "Yorumunuz başarıyla kaydedildi."
      : status === "error"
        ? "Yorumunuz kaydedilemedi! Lütfen tüm alanları doğru doldurduğunuzdan emin olun."
        : null;

  const refreshWithoutParam = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("status");

    router.replace(
      pathname + (params.toString() ? "?" + params.toString() : ""),
      {
        scroll: false,
      },
    );
  };

  if (!statusMessage) return null;

  return (
    <dialog className="modal" open>
      <div className="modal-box bg-gray-900">
        <p className="py-4">{statusMessage}</p>
        <div className="modal-action">
          <button
            className="btn btn-outline rounded-xl"
            onClick={refreshWithoutParam}
          >
            Kapat
          </button>
        </div>
      </div>
    </dialog>
  );
}
