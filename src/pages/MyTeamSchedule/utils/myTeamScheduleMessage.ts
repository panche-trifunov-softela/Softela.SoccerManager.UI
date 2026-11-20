import { CLUB_NOT_FOUND_MESSAGE } from '@/constants/clubNotFound'

/**
 * Says what shows instead of the schedule table, if anything.
 *
 * @param hasLeagueTeamId Whether the address names a valid league team id.
 * @param isLoading Whether the read for this club is still in flight.
 * @param error The fixed sentence that says why the read failed, or `null` when it did not.
 * @param matchCount How many matches the read found.
 * @returns The sentence to show, or `null` when the table shows matches.
 */
export function myTeamScheduleMessage(
  hasLeagueTeamId: boolean,
  isLoading: boolean,
  error: string | null,
  matchCount: number,
): string | null {
  if (!hasLeagueTeamId) return CLUB_NOT_FOUND_MESSAGE

  if (isLoading) return 'Loading the schedule…'

  if (error !== null) return error

  if (matchCount === 0) return 'This club has no matches this season.'

  return null
}
