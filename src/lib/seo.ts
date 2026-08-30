export const generateWebPageSchema = (
  title: string,
  description: string,
  url: string
): Record<string, unknown> => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": url,
    "publisher": {
      "@type": "Organization",
      "name": "Rahul Bali Astrology",
      "logo": {
        "@type": "ImageObject",
        "url": "https://astro.rahulbali.in/og-image.png"
      }
    }
  };
};

export const generateBreadcrumbSchema = (
  items: { name: string; item: string }[]
): Record<string, unknown> => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item
    }))
  };
};
