import type { ReactNode } from 'react'

import type { IncomingLeagueTeamManagerApplicationDto } from '@/types/incomingLeagueTeamManagerApplicationDto'

/** Props of `LeagueApplicationCard`. */
export interface LeagueApplicationCardProps {
  /** The application the card describes. */
  application: IncomingLeagueTeamManagerApplicationDto

  /** What sits at the end of the footer, after the day the application was made. */
  actions: ReactNode
}

/** What `useLeagueApplicationCard` exposes to the view. */
export interface LeagueApplicationCardState {
  /** The day the application was made, ready to render. */
  appliedOn: string
}
