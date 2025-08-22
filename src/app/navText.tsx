"use client";
import { useEffect, useRef } from "react";

export default function NavText() {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const karsilama = "ERHABA";
    let i = 0;

    if (!divRef.current) return;

    divRef.current.innerText = "M"; 

    const myInterval = setInterval(() => {
      if (!divRef.current) return;

      divRef.current.innerText += karsilama[i];
      i++;

      if (i === karsilama.length + 1) {
        i = 0;
        divRef.current.innerText = "M"; 
      }
    }, 500);

    // Cleanup
    return () => clearInterval(myInterval);
  }, []);

  return <div ref={divRef} className="text-center font-serif"></div>;
}
