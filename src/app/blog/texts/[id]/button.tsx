"use client";

export default function Button() {
  return (
    <button type="submit" className="btn btn-outline rounded mt-1" onClick={(e) => {e.currentTarget.disabled = true; e.currentTarget.form?.submit();}}>
      Yorum Gönder
    </button>
  );
}
