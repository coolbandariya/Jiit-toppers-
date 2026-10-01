import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // The prototype has a single public route. Add data-backed routes as they ship.
  return [{ url: 'https://jiit-toppers.vercel.app', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 }];
}
