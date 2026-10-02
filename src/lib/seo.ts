export const SITE_URL = "https://baliastrology.com";

export function getAlternates(path: string = "") {
  let cleanPath = (path || "").trim();
  if (cleanPath === "/" || cleanPath === "") {
    cleanPath = "";
  } else if (!cleanPath.startsWith("/")) {
    cleanPath = `/${cleanPath}`;
  }
  const url = `${SITE_URL}${cleanPath}`;

  return {
    canonical: url,
    languages: {
      "en": url,
      "en-US": url,
      "x-default": url,
    },
  };
}

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
      "name": "Bali Astrology",
      "logo": {
        "@type": "ImageObject",
        "url": "https://baliastrology.com/og-image.png"
      }
    }
  };
};
