import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin/", "/dashboard/", "/reset-password/"] }],
    sitemap: "https://gethired.info/sitemap.xml",
    host: "https://gethired.info",
  };
}

