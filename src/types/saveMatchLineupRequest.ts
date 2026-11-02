/**
 * The body of `PUT /api/matches/{id}/lineup`. It changes a club's lineup for a match: its
 * formation, one slot, or both. A slot that is not named is left as it is.
 *
 * Mirrors `SaveMatchLineupRequest` on the backend.
 */
export interface SaveMatchLineupRequest {
  /** The identifier of the match; the API takes it from the route, overwriting the body's value. */
  matchId: number

  /** The identifier of the league team (the club in its league) whose lineup to change. */
  leagueTeamId: number

  /**
   * The identifier of the formation to start the lineup in or switch it to, or `null`, or omitted,
   * to keep the current one.
   */
  formationId?: number | null

  /**
   * The number of the slot to change, from 1 to 19: 1 to 11 are the starters and 12 to 19 the
   * reserves. It is numbered by the lineup's formation after any switch. `null`, or omitted,
   * changes no slot.
   */
  slotNumber?: number | null

  /**
   * The identifier of the player to put in the slot. A player who is already in another slot
   * moves or swaps, and the API does the rest in the same save. `null`, or omitted, empties the
   * slot.
   */
  playerId?: number | null
}
