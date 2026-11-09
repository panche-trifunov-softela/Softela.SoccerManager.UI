/**
 * The body of `PUT /api/matches/{id}/substitutions/lineup`. It changes a club's substitution
 * lineup for a match at a minute and situation: its formation, one slot, or both. The first change
 * creates the substitution from the main lineup.
 *
 * Mirrors `SaveMatchLineupSubstitutionRequest` on the backend.
 */
export interface SaveMatchLineupSubstitutionRequest {
  /** The identifier of the match; the API takes it from the route, overwriting the body's value. */
  matchId: number

  /** The identifier of the league team (the club in its league) whose lineup to change. */
  leagueTeamId: number

  /** The minute of the substitution to change: 45, 60 or 75. */
  minuteAt: number

  /** The situation of the substitution to change, by the number the API uses for it. */
  situation: number

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
   * The identifier of the player to put in the slot. A player who is already in another slot of
   * the substitution's lineup moves or swaps, and a player who is not in it replaces the one in the
   * slot, who leaves the lineup. A slot is never emptied here: a slot sent without a player is
   * refused.
   */
  playerId?: number | null
}
