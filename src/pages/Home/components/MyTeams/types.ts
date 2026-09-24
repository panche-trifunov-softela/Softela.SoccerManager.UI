import type { MyLeagueTeamManagerDto } from '@/types/myLeagueTeamManagerDto'

/** What `useMyTeams` exposes to the view. */
export interface MyTeamsState {
  /** The teams to show, the backend's order preserved. */
  teams: readonly MyLeagueTeamManagerDto[]

  /** Whether the read is still in flight. */
  isLoading: boolean

  /** Why the read failed, or `null` when it did not. */
  error: string | null

  /** Whether the read succeeded and found nothing. */
  isEmpty: boolean
}
