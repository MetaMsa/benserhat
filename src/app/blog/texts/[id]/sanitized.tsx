"use client";

import DOMPurify from "isomorphic-dompurify";

export default function SanitizedContent({ html }: { html: string }) {
  const safeHTML = DOMPurify.sanitize(html);

  return (
    <div
      className="break-words text-xs sm:text-sm p-5 mx-auto my-5 text-left bg-gray-900 rounded-xl border"
      dangerouslySetInnerHTML={{ __html: safeHTML }}
    />
  );
}