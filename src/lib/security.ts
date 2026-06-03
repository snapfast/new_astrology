/**
 * Sanitizes a string by removing potential HTML tags (specifically < and >)
 * and enforcing a maximum length.
 */
export function sanitize(val: unknown, maxLength: number): string {
  if (!val || typeof val !== 'string') return '';
  return val
    .replace(/[<>]/g, '')
    .slice(0, maxLength);
}

/**
 * Sanitizes a coordinate string (latitude or longitude) by enforcing a maximum
 * length and a strict numeric format.
 */
export function sanitizeCoord(val: unknown): string {
  if (!val || typeof val !== 'string') return '';
  const sanitized = val.slice(0, 20);
  const regex = /^-?\d*\.?\d*$/;
  return regex.test(sanitized) ? sanitized : '';
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
