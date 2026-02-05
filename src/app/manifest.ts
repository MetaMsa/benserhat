import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "BenSerhat",
        short_name: "BenSerhat",
        description: "Ben Serhat, Fullstack Developer. C++, PHP, Next.js, Node.js, ASP.NET ve modern web teknolojileriyle projeler geliştiren yazılımcı. Portföyümü inceleyin.",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
        ],
    };
}