/**
 * Sanitizes a string by stripping < and > characters and enforcing a maximum length.
 * Useful for preventing basic XSS and DoS via long inputs.
 */
export const sanitize = (val: string | null, maxLength: number): string => {
  if (!val) return '';
  return val.replace(/[<>]/g, '').slice(0, maxLength);
};

/**
 * Sanitizes a coordinate string (latitude/longitude) by enforcing a maximum length
 * and a strict numeric format.
 */
export const sanitizeCoord = (val: string | null): string => {
  if (!val) return '';
  const sanitized = val.slice(0, 20);
  // Matches optional leading minus, followed by digits, optional dot, and more digits.
  return /^-?\d*\.?\d*$/.test(sanitized) ? sanitized : '';
};
