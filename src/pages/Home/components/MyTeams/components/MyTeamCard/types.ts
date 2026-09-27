import type { MyLeagueTeamManagerDto } from '@/types/myLeagueTeamManagerDto'

/** Props of `MyTeamCard`. */
export interface MyTeamCardProps {
  /** The team the card describes. */
  team: MyLeagueTeamManagerDto
}

/** What `useMyTeamCard` exposes to the view. */
export interface MyTeamCardState {
  /** The colour the card's bottom border is drawn in. */
  accent: string

  /** The span the tenure covers, ready to render. */
  tenure: string

  /** The path to the team's news feed, ready to link to. */
  newsFeedPath: string
}
