/** One squad member as the list shows them. */
export interface SquadRowView {
  /** The id of the player. */
  playerId: number

  /** The player's shirt number in this squad. */
  squadNumber: number

  /** The player's name. */
  name: string

  /** The short name of the player's main position, for example `CB`. */
  positionShortName: string

  /** The full name of that position, shown on hover. */
  positionName: string

  /** The player's current rating, or `null` when they have none. */
  rating: number | null

  /** The player's condition as a percentage, for example `87%`. */
  condition: string

  /** Whether the player is suspended. */
  isSuspended: boolean

  /** The label of the slot the player is in, or `null` when they are not in the lineup. */
  lineupLabel: string | null

  /** Whether the row can be picked: the player is in the lineup, or is not suspended. */
  isSelectable: boolean

  /** Whether the player is the selected one, or is in the selected slot. */
  isSelected: boolean

  /**
   * What a screen reader announces for the row: the name, position, number, rating and condition,
   * then the slot the player is in and whether they are suspended, when either applies.
   */
  ariaLabel: string
}

/** What `LineupSquadList` is handed. */
export interface LineupSquadListProps {
  /** The players in the starting eleven, in slot order. */
  starters: SquadRowView[]

  /** The players on the bench, in slot order. */
  bench: SquadRowView[]

  /** The players in neither, in the squad's own order. */
  notSelected: SquadRowView[]

  /** Whether the board refuses input, because a request is in flight. */
  isLocked: boolean

  /** Called with a player's id when their row is tapped. */
  onPlayerTap: (playerId: number) => void
}
