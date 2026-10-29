/**
 * One of the signed-in manager's pending applications to manage a club, enriched with the league
 * and team names for display.
 *
 * Mirrors `MyLeagueTeamManagerApplicationDto` on the backend. The timestamp arrives as a UTC ISO
 * string.
 */
export interface MyLeagueTeamManagerApplicationDto {
  /** The identifier of the application. */
  id: number

  /** The identifier of the club's entry on the league's roster: its league team id. */
  leagueTeamId: number

  /** The identifier of the league the application was made in. */
  leagueId: number

  /** The name of the league the application was made in. */
  leagueName: string

  /** The name of the team applied for. */
  teamName: string

  /** The team's logo, or `null` when it has none. */
  teamLogoUrl: string | null

  /** When the application was made, as a UTC ISO string. */
  createdAt: string
}
