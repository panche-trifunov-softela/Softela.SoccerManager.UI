/**
 * Keeps the digits of what was typed into a numeric input.
 *
 * @param text What the input holds.
 * @param maxDigits The most digits to keep.
 * @returns The digits 0 to 9 of the text, without leading zeros but for a single `0`, cut to
 * `maxDigits`; empty when the text has none.
 */
export function toDigits(text: string, maxDigits: number): string {
  const digits = text.replace(/[^0-9]/g, '').replace(/^0+(?=[0-9])/, '')

  return digits.slice(0, maxDigits)
}
