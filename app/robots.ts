import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/profile/"],
    },
    sitemap: "https://100xminds.ai/sitemap.xml",
  };
}
