'use client';

import { useEffect } from 'react';

export default function FontAwesomeLoader({ nonce }: { nonce?: string }) {
  useEffect(() => {
    const href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/fontawesome.min.css';
    if (document.querySelector(`link[href="${href}"]`)) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.crossOrigin = 'anonymous';
    link.referrerPolicy = 'no-referrer';
    if (nonce) link.nonce = nonce;
    document.head.appendChild(link);
  }, [nonce]);

  return null;
}
