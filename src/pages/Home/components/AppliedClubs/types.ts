import type { MyLeagueTeamManagerApplicationDto } from '@/types/myLeagueTeamManagerApplicationDto'

/** One finished read of the signed-in manager's pending applications. */
export interface AppliedClubsRead {
  /** The applications the API returned, or none when the read failed. */
  applications: readonly MyLeagueTeamManagerApplicationDto[]

  /** The fixed line for a failed read, or `null` when it succeeded. */
  error: string | null
}

/** What `useAppliedClubs` exposes to the view: the finished read, plus whether to hide it. */
export interface AppliedClubsState extends AppliedClubsRead {
  /** Whether the read is still in flight, or succeeded and found nothing. */
  isHidden: boolean
}
