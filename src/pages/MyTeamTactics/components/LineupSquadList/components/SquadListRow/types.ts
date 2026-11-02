import type { SquadRowView } from '../../types'

/** What `SquadListRow` is handed. */
export interface SquadListRowProps {
  /** The squad member to show. */
  row: SquadRowView

  /** Whether the board refuses input, because a request is in flight. */
  isLocked: boolean

  /** Called with the player's id when the row is tapped. */
  onTap: (playerId: number) => void
}
