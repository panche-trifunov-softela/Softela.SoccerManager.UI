import { formatEuros } from '@/utils/formatEuros'

/**
 * Writes the hint that states a player's value.
 *
 * @param value The player's transfer value, in euros.
 * @returns The value in the reader's locale, such as `Value €18M`.
 */
export function toValueHint(value: number): string {
  return `Value ${formatEuros(value)}`
}
