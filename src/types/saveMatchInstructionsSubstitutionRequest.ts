/**
 * The body of `PUT /api/matches/{id}/substitutions/instructions`. It changes one or more of a
 * club's instructions in its substitution for a match at a minute and situation. An instruction
 * that is not named is left as it is, and the first change creates the substitution from the main
 * lineup.
 *
 * Mirrors `SaveMatchInstructionsSubstitutionRequest` on the backend.
 */
export interface SaveMatchInstructionsSubstitutionRequest {
  /** The identifier of the match; the API takes it from the route, overwriting the body's value. */
  matchId: number

  /** The identifier of the league team (the club in its league) whose instructions to change. */
  leagueTeamId: number

  /** The minute of the substitution to change: 45, 60 or 75. */
  minuteAt: number

  /** The situation of the substitution to change, by the number the API uses for it. */
  situation: number

  /** How boldly the team plays, or `null`, or omitted, to keep it. */
  mentality?: number | null

  /** How fast the team moves the ball and its players, or `null`, or omitted, to keep it. */
  tempo?: number | null

  /** How the team moves the ball between its players, or `null`, or omitted, to keep it. */
  passing?: number | null

  /** How much of the pitch's width the team uses, or `null`, or omitted, to keep it. */
  width?: number | null

  /**
   * How the team goes after the ball when it does not have it, or `null`, or omitted, to keep it.
   */
  pressing?: number | null

  /** How hard the team challenges for the ball, or `null`, or omitted, to keep it. */
  tackling?: number | null

  /** Where on the pitch the team builds its attacks, or `null`, or omitted, to keep it. */
  attackingSide?: number | null
}
