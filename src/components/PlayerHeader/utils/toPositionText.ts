import { MISSING } from '@/constants/missing'

/**
 * Writes a player's main position for the header.
 *
 * @param name The full name of the main position, empty when the player has none.
 * @param shortName The short name of that position, empty when the player has none.
 * @returns The name with the short name in brackets, such as `Centre-Back (CB)`, or the
 * missing-value mark when the player has no main position.
 */
export function toPositionText(name: string, shortName: string): string {
  if (name === '') return MISSING

  return shortName === '' ? name : `${name} (${shortName})`
}
