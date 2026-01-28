"use client";

import { usePathname } from "next/navigation";

export default function Canonical() {
  const pathname = usePathname();

  return (
    <link
      rel="canonical"
      href={`https://benserhat.com${pathname}`}
    />
  );
}
