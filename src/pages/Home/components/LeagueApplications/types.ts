import type { IncomingLeagueTeamManagerApplicationDto } from '@/types/incomingLeagueTeamManagerApplicationDto'

/** One finished read of the applications made for clubs in the signed-in manager's leagues. */
export interface LeagueApplicationsRead {
  /** The applications the API returned, or none when the read failed. */
  applications: readonly IncomingLeagueTeamManagerApplicationDto[]

  /** The fixed line for a failed read, or `null` when it succeeded. */
  error: string | null
}

/** What `useLeagueApplications` exposes to the view: the finished read, plus whether to hide it. */
export interface LeagueApplicationsState extends LeagueApplicationsRead {
  /** Whether the read is still in flight, or succeeded and found nothing. */
  isHidden: boolean
}
