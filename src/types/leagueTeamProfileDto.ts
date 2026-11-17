/**
 * One club as its league has it: the names that identify it, the same for every caller.
 *
 * Mirrors `LeagueTeamProfileDto` on the backend, as `GET /api/league-teams/{id}/profile` returns
 * it.
 */
export interface LeagueTeamProfileDto {
  /** The identifier of the club's entry on the league's roster: its league team id. */
  leagueTeamId: number

  /** The identifier of the league the club plays in. */
  leagueId: number

  /** The name of that league. */
  leagueName: string

  /** The name of the club's team. */
  teamName: string

  /** The team's logo, or `null` when it has none. */
  teamLogoUrl: string | null
}
