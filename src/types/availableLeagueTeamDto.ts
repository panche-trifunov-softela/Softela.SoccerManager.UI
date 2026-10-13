import type { FinancialState } from './financialState'

/**
 * A club on one league's roster, with whether it currently has a manager, as
 * `GET /api/league-teams/available` returns it.
 */
export interface AvailableLeagueTeamDto {
  /** The identifier of the club's entry on the league's roster: its league team id. */
  id: number

  /** The name of the club. */
  teamName: string

  /** The URL of the club's logo image, or `null` when it has none. */
  teamLogoUrl: string | null

  /** The club's overall financial standing. */
  teamFinancialState: FinancialState

  /** Whether the club has a current manager in the league, so it cannot be applied for. */
  isManaged: boolean
}
