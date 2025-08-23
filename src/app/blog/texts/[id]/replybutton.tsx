"use client";

export default function ReplyButton() {
  return (
    <button
      className="btn btn-outline mt-3 rounded"
      type="submit"
      onClick={(e) => {
        e.currentTarget.disabled = true;
        e.currentTarget.form?.submit();
      }}
    >
      Gönder
    </button>
  );
}
