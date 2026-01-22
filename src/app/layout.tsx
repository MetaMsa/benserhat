import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import NavText from "./navText";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  description:
    "Ben Serhat, Fullstack Developer. C++, PHP, Next.js, Node.js, ASP.NET ve modern web teknolojileriyle projeler geliştiren yazılımcı. Portföyümü inceleyin.",
  keywords:
    "Mehmet Serhat ASLAN,Serhat,Yazılımcı,Fullstack Developer,Türkiye,Web Developer,Portföy,C++ Developer,React,Next.js,Node.js, Developer",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
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
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <meta
          name="google-adsense-account"
          content="ca-pub-2573992278913198"
        ></meta>
        <script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="benserhat" data-description="Support me on Buy me a coffee!" data-message="Dilerseniz bana destek olabilirsiniz." data-color="#BD5FFF" data-position="Right" data-x_margin="18" data-y_margin="80" defer></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Analytics />
        <SpeedInsights />
        <header className="flex justify-center mb-50 md:mb-25">
          <nav
            aria-label="Global"
            className="fixed navbar navbar-center mx-auto flex flex-col md:flex-row items-center justify-between p-3 border-b bg-gray-900 z-10"
          >
            <Link href={"/"} className="size-20">
              <Image
                className="rounded-xl"
                src="/3da59a4e-59eb-42ef-ba79-70d24b85147b-_1_.svg"
                width={500}
                height={500}
                alt="Logo"
                priority
              />
            </Link>
            <NavText />
            <div className="flex-none z-1">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <details className="dropdown">
                    <summary className="text-center">MENÜ</summary>
                    <ul className="bg-gray-900 rounded-t-none p-2">
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
                      <li>
                        <Link href={"/projects"} className="m-auto">
                          Projeler
                        </Link>
                      </li>
                      <li>
                        <Link href={"https://tatilmi.benserhat.com/"} className="m-auto">
                          TatilMi?
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
        <footer className="flex items-center justify-center footer footer-center bg-gray-900 mt-auto p-5 text-md sm:text-lg md:text-2xl border-t">
          <Link
            className="mx-1 sm:mx-5"
            href={"https://www.youtube.com/@metamsa"}
          >
            <i className="fa-brands fa-youtube"></i>
          </Link>
          <Link className="mx-1 sm:mx-5" href={"https://github.com/MetaMsa"}>
            <i className="fa-brands fa-github"></i>
          </Link>
          <Link className="mx-1 sm:mx-5" href={"/cv.pdf"}>
            cv
          </Link>
          <Link className="mx-1 sm:mx-5" href={"/gdpr"}>
            Gizlilik Politikası
          </Link>
          <Link className="mx-1 sm:mx-5" href={"/docs"}>
            api
          </Link>
          <Link
            className="mx-1 sm:mx-5"
            href={"https://www.linkedin.com/in/mehmet-serhat-aslan-58272b28a"}
          >
            <i className="fa-brands fa-linkedin"></i>
          </Link>
          <Link
            className="mx-1 sm:mx-5"
            href={"mailto:mserhataslan@hotmail.com"}
          >
            <i className="fa-solid fa-envelope"></i>
          </Link>
        </footer>
      </body>
    </html>
  );
}
