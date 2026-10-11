import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://drexa.tech";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, priority: 1 },
    { url: `${base}/services`, lastModified: now, priority: 0.8 },
    { url: `${base}/work`, lastModified: now, priority: 0.8 },
    { url: `${base}/about`, lastModified: now, priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, priority: 0.7 },
    { url: `${base}/team`, lastModified: now, priority: 0.6 },
    { url: `${base}/privacy`, lastModified: now, priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, priority: 0.3 },
  ];
}
