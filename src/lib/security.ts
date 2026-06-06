/**
 * Sanitizes a string by removing potential HTML tags (specifically < and >)
 * and common XSS vectors like "javascript:" or "onhover=".
 * Enforces a maximum length and strips null bytes.
 */
export function sanitize(val: unknown, maxLength: number): string {
  if (!val || typeof val !== 'string') return '';
  let sanitized = val
    .slice(0, maxLength)
    .replace(/\0/g, '') // Remove null bytes
    .replace(/[<>]/g, '');

  // Recursively remove suspicious protocols to prevent bypasses like "javasjavascriptcript:"
  let prev;
  do {
    prev = sanitized;
    sanitized = sanitized.replace(/(javascript|vbscript|data|feed|file|jar):/gi, '');
  } while (sanitized !== prev);

  return sanitized
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

/**
 * Sanitizes a coordinate string (latitude or longitude) by enforcing a maximum
 * length and a strict numeric format that prevents "NaN" results.
 */
export function sanitizeCoord(val: unknown): string {
  if (!val || typeof val !== 'string') return '';
  const sanitized = val.slice(0, 20);
  // Strict regex to ensure it's a valid number and not just ".", "-", or "1.2.3"
  const regex = /^-?\d+(\.\d+)?$/;
  if (!regex.test(sanitized)) return '';

  const num = parseFloat(sanitized);
  // Latitude is [-90, 90], Longitude is [-180, 180].
  // 180 is a safe upper bound for both to prevent extreme out-of-range values.
  return Math.abs(num) <= 180 ? sanitized : '';
}

/**
 * Validates and sanitizes a date string in YYYY-MM-DD format.
 */
export function sanitizeDate(val: unknown): string {
  if (!val || typeof val !== 'string') return '';
  const sanitized = val.slice(0, 10);
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(sanitized) ? sanitized : '';
}

/**
 * Validates and sanitizes a time string in HH:mm format.
 */
export function sanitizeTime(val: unknown): string {
  if (!val || typeof val !== 'string') return '';
  const sanitized = val.slice(0, 5);
  const regex = /^\d{2}:\d{2}$/;
  return regex.test(sanitized) ? sanitized : '';
}
