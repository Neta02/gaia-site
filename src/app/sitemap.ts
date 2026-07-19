import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/links";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/recrutement`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/mentions-legales`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
