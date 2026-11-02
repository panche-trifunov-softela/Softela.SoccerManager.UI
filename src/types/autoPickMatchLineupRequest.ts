/**
 * The body of `POST /api/matches/{id}/lineup/auto-pick`. It replaces a club's lineup for a match
 * with one picked from its squad.
 *
 * Mirrors `AutoPickMatchLineupRequest` on the backend.
 */
export interface AutoPickMatchLineupRequest {
  /** The identifier of the match; the API takes it from the route, overwriting the body's value. */
  matchId: number

  /** The identifier of the league team (the club in its league) whose lineup to pick. */
  leagueTeamId: number

  /**
   * The identifier of the formation to pick for, or `null`, or omitted, to keep the stored one, or
   * use the default when there is none.
   */
  formationId?: number | null
}
