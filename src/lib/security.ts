/**
 * Sanitizes a string by stripping HTML tags and enforcing a maximum length.
 * Useful for text inputs to prevent XSS and UI breakage.
 */
export const sanitize = (val: string, maxLength: number): string => {
  if (!val) return '';
  return val
    .replace(/[<>]/g, '')
    .slice(0, maxLength);
};

/**
 * Sanitizes geographic coordinates (latitude/longitude).
 * Enforces numeric format and length limit.
 */
export const sanitizeCoord = (val: string): string => {
  if (!val) return '';
  const sanitized = val.slice(0, 20);
  // Strict numeric regex: allows optional negative sign, digits, and one decimal point
  if (!/^-?\d*\.?\d*$/.test(sanitized)) {
    return '';
  }
  return sanitized;
};
