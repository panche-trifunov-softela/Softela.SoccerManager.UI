import type { MatchOutcome } from './matchOutcome'

/**
 * One match of a club's schedule, as `GET /api/league-teams/{id}/schedule` returns it, in a bare
 * array: every match of the club in its League's latest season, earliest first.
 *
 * Mirrors `LeagueTeamScheduleMatchDto` on the backend. The start time arrives as a UTC ISO string
 * ending in `Z`.
 */
export interface LeagueTeamScheduleMatchDto {
  /** The identifier of the match. */
  matchId: number

  /** When the match is due to start, as a UTC ISO string ending in `Z`. */
  startDateTime: string

  /** Whether the club plays the match at home. */
  isHomeTeam: boolean

  /** The name of the competition, or `null` for a friendly. */
  competitionName: string | null

  /** The name of the round or stage in the competition, or `null` when it has none to show. */
  stageName: string | null

  /** The name of the opponent's team, or `null` when the match has no second participant. */
  opponentTeamName: string | null

  /** The URL of the opponent's logo, or `null` when there is no opponent or no logo. */
  opponentTeamLogoUrl: string | null

  /** The goals the club scored, or `null` until the match is finished. */
  goalsFor: number | null

  /** The goals the opponent scored, or `null` until the match is finished. */
  goalsAgainst: number | null

  /**
   * The shoot-out goals the club scored, or `null` unless the match is finished and went to a
   * shoot-out.
   */
  shootoutGoalsFor: number | null

  /**
   * The shoot-out goals the opponent scored, or `null` unless the match is finished and went to a
   * shoot-out.
   */
  shootoutGoalsAgainst: number | null

  /** How the match ended for the club, or `null` until the match is finished. */
  outcome: MatchOutcome | null

  /**
   * The outcome as a word the API writes (such as `Win`), or `null` until the match is finished.
   */
  outcomeLabel: string | null
}
