/**
 * Reads the league id from the address.
 *
 * @param value The address's `:leagueId` segment, if there is one.
 * @returns The id, or `null` when the segment is not a whole number above zero.
 */
export function toLeagueId(value: string | undefined): number | null {
  if (value === undefined || !/^[1-9]\d*$/.test(value)) return null

  const id = Number(value)

  return Number.isSafeInteger(id) ? id : null
}
