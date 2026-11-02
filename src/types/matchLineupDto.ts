import type { MatchLineupSlotDto } from './matchLineupSlotDto'

/**
 * A club's lineup for a match: its formation and every slot of it, as
 * `PUT /api/matches/{id}/lineup` and `POST /api/matches/{id}/lineup/auto-pick` return it, and as
 * `GET /api/league-teams/{id}/next-match` carries it.
 *
 * Mirrors `MatchLineupDto` on the backend.
 */
export interface MatchLineupDto {
  /** The identifier of the match. */
  matchId: number

  /** The identifier of the league team (the club in its league) the lineup belongs to. */
  leagueTeamId: number

  /** The identifier of the lineup's formation, or `null` when no complete formation exists. */
  formationId: number | null

  /** The name of the lineup's formation, or `null` when no complete formation exists. */
  formationName: string | null

  /**
   * Every slot of the formation in slot order, filled or empty. An empty lineup still lists the
   * formation's slots, all empty; the list is empty only when no complete formation exists.
   */
  slots: MatchLineupSlotDto[]
}
