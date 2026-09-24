/**
 * One of the signed-in manager's league team appointments, enriched with the
 * league and team names for display.
 *
 * Mirrors `MyLeagueTeamManagerDto` on the backend. The two date-only fields
 * arrive as `yyyy-MM-dd`; the two timestamps arrive as UTC ISO strings.
 */
export interface MyLeagueTeamManagerDto {
  /** The identifier of the appointment. */
  id: number

  /** The identifier of the league the appointment belongs to. */
  leagueId: number

  /** The name of that league. */
  leagueName: string

  /** The identifier of the team the manager is appointed to. */
  teamId: number

  /** The name of that team. */
  teamName: string

  /** The team's logo, or `null` when it has none. */
  teamLogoUrl: string | null

  /** The identifier of the manager the appointment belongs to. */
  managerId: number

  /** The date the tenure started, as `yyyy-MM-dd`. */
  startDate: string

  /** The date it ended, or `null` while it is still current. */
  endDate: string | null

  /** Whether this is the team's current manager in the league. */
  isCurrent: boolean

  /** When the appointment was created, as a UTC ISO string. */
  createdAt: string

  /** When it was last modified, as a UTC ISO string. */
  modifiedAt: string
}
