import { CLUB_NOT_FOUND_MESSAGE } from '../constants'

/**
 * Says what shows instead of the squad table, if anything.
 *
 * @param hasLeagueTeamId Whether the address names a valid league team id.
 * @param isLoading Whether the read for this club is still in flight.
 * @param error The fixed sentence that says why the read failed, or `null` when it did not.
 * @param playerCount How many players the read found.
 * @returns The sentence to show, or `null` when the table shows players.
 */
export function myTeamSquadMessage(
  hasLeagueTeamId: boolean,
  isLoading: boolean,
  error: string | null,
  playerCount: number,
): string | null {
  if (!hasLeagueTeamId) return CLUB_NOT_FOUND_MESSAGE

  if (isLoading) return 'Loading the squad…'

  if (error !== null) return error

  if (playerCount === 0) return 'This club has no players yet.'

  return null
}
