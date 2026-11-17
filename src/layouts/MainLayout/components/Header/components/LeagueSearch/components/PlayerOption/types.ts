import type { LeagueSearchPlayerItemDto } from '@/types/leagueSearchPlayerItemDto'

/** Props of `PlayerOption`. */
export interface PlayerOptionProps {
  /** The element id of the option, which the input points at while the option is active. */
  id: string

  /** The player the option stands for. */
  player: LeagueSearchPlayerItemDto

  /** Whether the arrow keys are on this option. */
  isActive: boolean

  /** Called with the player when the option is pressed. */
  onPick: (player: LeagueSearchPlayerItemDto) => void
}
