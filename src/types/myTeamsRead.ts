import type { MyLeagueTeamManagerDto } from './myLeagueTeamManagerDto'

/** One read of the signed-in manager's clubs, as the my-teams store holds it. */
export interface MyTeamsRead {
  /** The teams read, empty until the read resolves and when it failed. */
  teams: readonly MyLeagueTeamManagerDto[]

  /** Whether the read is still in flight. */
  isLoading: boolean

  /** The fixed line to show when the read failed, or `null` when it did not. */
  error: string | null
}
