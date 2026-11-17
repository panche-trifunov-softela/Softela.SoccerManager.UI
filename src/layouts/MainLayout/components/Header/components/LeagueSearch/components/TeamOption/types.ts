import type { LeagueSearchTeamItemDto } from '@/types/leagueSearchTeamItemDto'

/** Props of `TeamOption`. */
export interface TeamOptionProps {
  /** The element id of the option, which the input points at while the option is active. */
  id: string

  /** The team the option stands for. */
  team: LeagueSearchTeamItemDto

  /** Whether the arrow keys are on this option. */
  isActive: boolean

  /** Called with the team when the option is pressed. */
  onPick: (team: LeagueSearchTeamItemDto) => void
}
