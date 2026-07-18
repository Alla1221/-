import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const sections = [
    "",
    "#services",
    "#portfolio",
    "#about",
    "#skills",
    "#testimonials",
    "#blog",
    "#faq",
    "#contact",
  ];

  return sections.map((section) => ({
    url: `${siteConfig.url}/${section}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: section === "" ? 1 : 0.7,
  }));
}
