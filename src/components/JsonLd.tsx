import React from 'react';
import serialize from 'serialize-javascript';

interface JsonLdProps {
  data: Record<string, unknown>;
  nonce?: string;
}

const JsonLd = ({ data, nonce }: JsonLdProps) => {
  // Use serialize-javascript with isJSON flag to safely serialize JSON-LD
  // while properly escaping all characters (including </script> and unicode separators)
  const serialized = serialize(data, { isJSON: true });

  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  );
};

export default JsonLd;
