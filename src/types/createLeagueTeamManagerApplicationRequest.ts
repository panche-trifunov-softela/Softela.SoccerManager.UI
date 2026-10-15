/**
 * The body of `POST /api/league-team-manager-applications`. The applying manager is the
 * signed-in caller, taken from the token, so it is not part of the body.
 */
export interface CreateLeagueTeamManagerApplicationRequest {
  /** The league team id of the club the caller applies to manage. */
  leagueTeamId: number
}
