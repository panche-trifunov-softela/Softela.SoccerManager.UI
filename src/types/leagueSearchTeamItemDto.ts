/**
 * One club a league search found.
 *
 * Mirrors an item of `teams` in `GET /api/league-teams/{id}/search`.
 */
export interface LeagueSearchTeamItemDto {
  /** The identifier of the club's league team. */
  leagueTeamId: number

  /** The name of the club. */
  teamName: string

  /** The URL of the club's logo, or `null` when it has none. */
  teamLogoUrl: string | null
}
