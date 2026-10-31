import type { IncomingLeagueTeamManagerApplicationDto } from '@/types/incomingLeagueTeamManagerApplicationDto'

/** Props of `LeagueApplicationCard`. */
export interface LeagueApplicationCardProps {
  /** The application the card describes. */
  application: IncomingLeagueTeamManagerApplicationDto
}

/** What `useLeagueApplicationCard` exposes to the view. */
export interface LeagueApplicationCardState {
  /** The day the application was made, ready to render. */
  appliedOn: string
}
