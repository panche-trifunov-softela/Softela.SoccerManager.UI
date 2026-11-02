/**
 * Shortens a player's name to the surname, which is what fits under a marker on the pitch.
 *
 * - A name of two or more words drops the first word and keeps every word after it, so
 *   `Kevin De Bruyne` becomes `De Bruyne` and `Virgil van Dijk` becomes `van Dijk`.
 * - A one-word name is kept as it is.
 * - Surrounding and repeated spaces are dropped.
 *
 * @param name The player's full name.
 * @returns The name as a marker shows it.
 */
export function toMarkerName(name: string): string {
  const [first, ...rest] = name.trim().split(/\s+/)

  if (rest.length === 0) return first

  return rest.join(' ')
}
