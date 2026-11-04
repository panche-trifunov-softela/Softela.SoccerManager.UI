/**
 * A club's instructions for a match: the seven choices that set how the team plays, as
 * `PUT /api/matches/{id}/instructions` returns them, and as `GET /api/league-teams/{id}/next-match`
 * carries them. Each is one of the numbers `GET /api/matches/instruction-options` offers for it.
 *
 * Mirrors `MatchInstructionsDto` on the backend.
 */
export interface MatchInstructionsDto {
  /** The identifier of the match. */
  matchId: number

  /** The identifier of the league team (the club in its league) the instructions belong to. */
  leagueTeamId: number

  /** How boldly the team plays. */
  mentality: number

  /** How fast the team moves the ball and its players. */
  tempo: number

  /** How the team moves the ball between its players. */
  passing: number

  /** How much of the pitch's width the team uses. */
  width: number

  /** How the team goes after the ball when it does not have it. */
  pressing: number

  /** How hard the team challenges for the ball. */
  tackling: number

  /** Where on the pitch the team builds its attacks. */
  attackingSide: number
}
