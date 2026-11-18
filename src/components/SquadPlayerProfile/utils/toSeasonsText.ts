/**
 * Writes a number of seasons in words.
 *
 * @param count How many seasons.
 * @returns The count and the noun, such as `1 season` or `2 seasons`.
 */
export function toSeasonsText(count: number): string {
  return count === 1 ? `${count} season` : `${count} seasons`
}
