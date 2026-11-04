import type { MatchInstructionsDto } from './matchInstructionsDto'
import type { MatchLineupDto } from './matchLineupDto'

/**
 * A club's next match, with its opponent and the club's lineup and instructions for it, as
 * `GET /api/league-teams/{id}/next-match` returns it. The API answers 204 with no body when the
 * club has no match to come.
 *
 * Mirrors `NextMatchDto` on the backend. The start time arrives as a UTC ISO string ending in `Z`.
 */
export interface NextMatchDto {
  /** The identifier of the match. */
  matchId: number

  /** When the match is due to start, as a UTC ISO string ending in `Z`. */
  startDateTime: string

  /** Whether the club plays the match at home. */
  isHomeTeam: boolean

  /**
   * The identifier of the opponent's league team, or `null` when the match has no second
   * participant.
   */
  opponentLeagueTeamId: number | null

  /** The name of the opponent's team, or `null` when the match has no second participant. */
  opponentTeamName: string | null

  /** The URL of the opponent's logo, or `null` when there is no opponent or no logo. */
  opponentTeamLogoUrl: string | null

  /** The club's lineup for the match. */
  lineup: MatchLineupDto

  /**
   * The club's instructions for the match: the ones saved for it, else the ones it last saved for
   * an earlier match, else the defaults.
   */
  instructions: MatchInstructionsDto
}
