import type { MyLeagueTeamManagerDto } from '@/types/myLeagueTeamManagerDto'

/** Props of `MyTeamCard`. */
export interface MyTeamCardProps {
  /** The team the card describes. */
  team: MyLeagueTeamManagerDto
}

/** What `useMyTeamCard` exposes to the view. */
export interface MyTeamCardState {
  /** The span the tenure covers, ready to render. */
  tenure: string

  /** The path to the team's squad, ready to link to. */
  squadPath: string
}
