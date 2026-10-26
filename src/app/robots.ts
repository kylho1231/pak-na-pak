import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/dashboard/*", "/api/*"],
      },
    ],
    sitemap: "https://pak-na-pak.vercel.app/sitemap.xml",
  };
}
