import { SITE_URL } from "@/lib/site-url";
import type { MetadataRoute } from "next";

// Generated once at build time (required for static export).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
