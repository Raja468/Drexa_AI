import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://drexa.tech";
  const now = new Date();
  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.8 },
    { path: "/services/cybersecurity", priority: 0.9 },
    { path: "/services/ai-visibility", priority: 0.9 },
    { path: "/services/web-development", priority: 0.8 },
    { path: "/services/software-development", priority: 0.8 },
    { path: "/services/ai-automation", priority: 0.8 },
    { path: "/tools", priority: 0.8 },
    { path: "/security-score", priority: 0.8 },
    { path: "/seo-check", priority: 0.8 },
    { path: "/chakwal", priority: 0.8 },
    { path: "/work", priority: 0.8 },
    { path: "/work/chatconnect-ai", priority: 0.7 },
    { path: "/work/drex-ai-assistant", priority: 0.7 },
    { path: "/work/iqra-school-management", priority: 0.7 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    { path: "/team", priority: 0.6 },
    { path: "/blog", priority: 0.6 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ];
  return routes.map(({ path, priority }) => ({
    url: `${base}${path}`,
    lastModified: now,
    priority,
  }));
}
