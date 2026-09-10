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
        "url": "https://baliastrology.com/og-image.png"
      }
    }
  };
};

