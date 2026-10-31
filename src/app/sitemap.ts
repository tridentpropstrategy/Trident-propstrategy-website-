import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.domain,
      lastModified: new Date("2025-01-01"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
