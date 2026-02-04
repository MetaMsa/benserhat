"use client";
import { TypeAnimation } from "react-type-animation";

export default function NavText() {
  return (
    <span className="text-center font-serif w-72">
      <TypeAnimation
        sequence={[
          "MERHABA",
          1000,
          "",
          2000,
        ]}
        wrapper="span"
        cursor={true}
        repeat={Infinity}
        style={{ fontSize: "2em", display: "inline-block" }}
        speed={{type: 'keyStrokeDelayInMs', value: 100}}
      />
    </span>
  );
}
