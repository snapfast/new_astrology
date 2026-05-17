/**
 * Sanitizes a string by stripping potentially dangerous characters and enforcing a maximum length.
 * @param val The string to sanitize.
 * @param maxLength The maximum allowed length for the string.
 * @returns The sanitized string.
 */
export function sanitize(val: string | null, maxLength: number): string {
  if (!val) return '';
  // Remove potentially dangerous characters and limit length
  return val.replace(/[<>]/g, '').slice(0, maxLength);
}

/**
 * Sanitizes coordinate strings (latitude/longitude) by enforcing a numeric format and maximum length.
 * @param val The coordinate string to sanitize.
 * @returns The sanitized coordinate string.
 */
export function sanitizeCoord(val: string | null): string {
  if (!val) return '';
  const maxLength = 20;
  const sanitized = val.slice(0, maxLength);
  // Enforce strict numeric/decimal format
  if (/^-?\d*\.?\d*$/.test(sanitized)) {
    return sanitized;
  }
  return '';
}
