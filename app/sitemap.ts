import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://gethired.info";
  const pages = ["", "/about/", "/pricing/", "/contact/", "/signup/", "/login/", "/privacy/", "/terms/", "/refund/", "/unsubscribe/"];
  return pages.map((path, index) => ({
    url: `${base}${path || "/"}`,
    lastModified: new Date("2026-08-23"),
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : path === "/signup/" ? 0.9 : 0.7,
  }));
}

