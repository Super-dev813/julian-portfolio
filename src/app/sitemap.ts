import { SITE_URL } from "@/lib/site-url";
import type { MetadataRoute } from "next";

// Generated once at build time (required for static export).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, changeFrequency: "monthly", priority: 1 }];
}
