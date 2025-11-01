"use client";

import { useState } from "react";

export default function Button({ pageId }) {
  const [disabled, setDisabled] = useState(false);
  return (
    <form
      action="../../../api/comment"
      method="post"
      className="bg-gray-900 w-60 py-5 mx-auto rounded-xl border"
      onSubmit={() => {
          setDisabled(true);  
        }}
    >
      <textarea
        className="border text-sm w-50 rounded"
        placeholder="Yorumunuzu girin..."
        name="text"
        required
      ></textarea>{" "}
      <br />
      <input
        className="border text-sm w-50 rounded"
        type="email"
        name="email"
        placeholder="E-Postanızı girin..."
        required
      />{" "}
      <br />
      <input
        className="border text-sm w-50 rounded"
        type="text"
        name="author"
        placeholder="Kullanıcı adınızı girin..."
        required
      />{" "}
      <br />
      <input type="hidden" name="page" value={pageId} />
      <button
        type="submit"
        className="btn btn-outline rounded mt-1"
        disabled={disabled}
      >
        Gönder
      </button>
    </form>
  );
}
