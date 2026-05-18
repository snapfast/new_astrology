/**
 * Sanitizes a string by removing potential HTML tags (specifically < and >)
 * and enforcing a maximum length.
 */
export function sanitize(val: string | null, maxLength: number): string {
  if (!val) return '';
  return val
    .replace(/[<>]/g, '')
    .slice(0, maxLength);
}

/**
 * Sanitizes a coordinate string (latitude or longitude) by enforcing a maximum
 * length and a strict numeric format.
 */
export function sanitizeCoord(val: string | null): string {
  if (!val) return '';
  const sanitized = val.slice(0, 20);
  const regex = /^-?\d*\.?\d*$/;
  return regex.test(sanitized) ? sanitized : '';
}
