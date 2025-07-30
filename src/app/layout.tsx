import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import NavText from "./navText";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Serhat",
  description: "Ben Serhat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css"
          integrity="sha512-DxV+EoADOkOygM4IR9yXP8Sb2qwgidEmeqAEmDKIOfPRQZOWbXCzLC6vjbZyy0vPisbH2SyW27+ddLVCN+OMzQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <meta
          name="google-adsense-account"
          content="ca-pub-2573992278913198"
        ></meta>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Analytics/>
        <header className="bg-gray-900">
          <nav
            aria-label="Global"
            className="navbar navbar-center mx-auto flex flex-col md:flex-row max-w-7xl items-center justify-between p-3"
          >
            <Link href={"/"} className="size-20">
              <Image
                className="rounded-xl"
                src="3da59a4e-59eb-42ef-ba79-70d24b85147b-_1_.svg"
                width={500}
                height={500}
                alt=""
              />
            </Link>
            <NavText />
            <div className="flex-none z-1">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <details>
                    <summary className="text-center">MENÜ</summary>
                    <ul className="bg-base-100 rounded-t-none p-2">
                      <li>
                        <Link href={"/"} className="m-auto">
                          <i className="fa fa-house"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href={"/blog"} className="m-auto">
                          Blog
                        </Link>
                      </li>
                      <li>
                        <Link href={"/codle"} className="m-auto">
                          CoDle
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <main className="text-center">{children}</main>
        <footer className="flex items-center justify-center footer footer-center bg-gray-900 mt-auto p-5 text-2xl">
          <Link className="mx-5" href={"https://www.youtube.com/@metamsa"}>
            <i className="fa-brands fa-youtube"></i>
          </Link>
          <Link className="mx-5" href={"https://github.com/MetaMsa"}>
            <i className="fa-brands fa-github"></i>
          </Link>
          <Link
            className="mx-5"
            href={"https://www.linkedin.com/in/mehmet-serhat-aslan-58272b28a"}
          >
            <i className="fa-brands fa-linkedin"></i>
          </Link>
        </footer>
      </body>
    </html>
  );
}
