/**
 * What `DELETE /api/matches/{id}/substitutions` names, in its route and its query: one of a club's
 * substitutions for a match, by its minute and situation.
 *
 * Mirrors `DeleteMatchSubstitutionRequest` on the backend.
 */
export interface DeleteMatchSubstitutionRequest {
  /** The identifier of the match; the API takes it from the route. */
  matchId: number

  /** The identifier of the league team (the club in its league) whose substitution to delete. */
  leagueTeamId: number

  /** The minute of the substitution to delete: 45, 60 or 75. */
  minuteAt: number

  /** The situation of the substitution to delete, by the number the API uses for it. */
  situation: number
}
