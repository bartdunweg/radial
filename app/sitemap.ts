import type { MetadataRoute } from "next";
import blogEn from "@/content/en/blog.json";
import servicesEn from "@/content/en/services.json";

const BASE_URL = "https://studioradial.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/projects", "/expertise", "/blog", "/pricing", "/contact"];

  const staticEntries = staticRoutes.flatMap((route) => [
    {
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      alternates: {
        languages: { en: `${BASE_URL}${route}`, nl: `${BASE_URL}/nl${route}` },
      },
    },
  ]);

  const blogEntries = blogEn.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    alternates: {
      languages: {
        en: `${BASE_URL}/blog/${post.slug}`,
        nl: `${BASE_URL}/nl/blog/${post.slug}`,
      },
    },
  }));

  const serviceEntries = servicesEn.map((service) => ({
    url: `${BASE_URL}/expertise/${service.slug}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        en: `${BASE_URL}/expertise/${service.slug}`,
        nl: `${BASE_URL}/nl/expertise/${service.slug}`,
      },
    },
  }));

  return [...staticEntries, ...blogEntries, ...serviceEntries];
}
