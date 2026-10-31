/**
 * An application made for a club in one of the signed-in caller's leagues, enriched with the
 * league, team and applicant names for display.
 *
 * Mirrors `IncomingLeagueTeamManagerApplicationDto` on the backend. The timestamp arrives as a UTC
 * ISO string.
 */
export interface IncomingLeagueTeamManagerApplicationDto {
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

  /** The id of the manager who applied. */
  managerId: number

  /** The name of the manager who applied, ready to show, or `null` when it is not known. */
  managerName: string | null

  /** The address of the applicant's photo, or `null` when they have none. */
  managerImageUrl: string | null

  /** When the application was made, as a UTC ISO string. */
  createdAt: string
}
