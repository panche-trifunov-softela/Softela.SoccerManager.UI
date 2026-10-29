import type { MyLeagueTeamManagerApplicationDto } from '@/types/myLeagueTeamManagerApplicationDto'

/** Props of `AppliedClubCard`. */
export interface AppliedClubCardProps {
  /** The application the card describes. */
  application: MyLeagueTeamManagerApplicationDto
}

/** What `useAppliedClubCard` exposes to the view. */
export interface AppliedClubCardState {
  /** The day the application was made, ready to render. */
  appliedOn: string

  /** The path to the league's club list, ready to link to. */
  availableTeamsPath: string
}
