/**
 * Sanitizes a string by stripping potentially dangerous characters and enforcing length limits.
 * @param val The string to sanitize.
 * @param maxLength The maximum allowed length.
 * @returns The sanitized string.
 */
export function sanitize(val: string | null, maxLength: number): string {
  if (!val) return '';
  // Strip < and > to prevent basic HTML injection
  const stripped = val.replace(/[<>]/g, '');
  return stripped.slice(0, maxLength);
}

/**
 * Validates and sanitizes a coordinate (latitude/longitude) string.
 * @param val The coordinate string to sanitize.
 * @returns A sanitized numeric string or an empty string if invalid.
 */
export function sanitizeCoord(val: string | null): string {
  if (!val) return '';
  const trimmed = val.trim();
  // Strictly allow only numbers, decimal points, and leading minus signs
  // Max length 20 is plenty for double precision coordinates
  if (trimmed.length > 20 || !/^-?\d*\.?\d*$/.test(trimmed)) {
    return '';
  }
  return trimmed;
}
