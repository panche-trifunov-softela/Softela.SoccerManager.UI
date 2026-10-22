import { NOT_FOUND_MESSAGE } from '../constants'

/**
 * Says what shows instead of the clubs table, if anything.
 *
 * @param hasLeagueId Whether the address names a valid league id.
 * @param isLoading Whether the read for this league is still in flight.
 * @param error The fixed sentence that says why the read failed (not found, or could not
 * be loaded), or `null` when it did not.
 * @param rowCount How many clubs the read found.
 * @returns The sentence to show, or `null` when the table shows clubs.
 */
export function availableTeamsMessage(
  hasLeagueId: boolean,
  isLoading: boolean,
  error: string | null,
  rowCount: number,
): string | null {
  if (!hasLeagueId) return NOT_FOUND_MESSAGE

  if (isLoading) return 'Loading clubs…'

  if (error !== null) return error

  if (rowCount === 0) return 'This game world has no clubs yet.'

  return null
}
