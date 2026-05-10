/**
 * Sanitizes JSON-LD data to prevent XSS vulnerabilities.
 * Escapes <, >, \u2028, and \u2029.
 */
export const sanitizeJsonLd = (data: Record<string, unknown>): string => {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
};

interface JsonLdProps {
  data: Record<string, unknown>;
}

const JsonLd = ({ data }: JsonLdProps) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: sanitizeJsonLd(data),
      }}
    />
  );
};

export default JsonLd;
