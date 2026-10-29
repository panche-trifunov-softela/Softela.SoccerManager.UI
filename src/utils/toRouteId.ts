/**
 * Reads an id from a segment of the address, such as `:leagueId`.
 *
 * @param value The segment, if the address has one.
 * @returns The id, or `null` when the segment is not a whole number above zero.
 */
export function toRouteId(value: string | undefined): number | null {
  if (value === undefined || !/^[1-9]\d*$/.test(value)) return null

  const id = Number(value)

  return Number.isSafeInteger(id) ? id : null
}
