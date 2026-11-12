/** What `PlayerStatus` is handed: a player's state in a club's game world, texts already written. */
export interface PlayerStatusProps {
  /** The player's condition as a percentage, for example `87%`. */
  condition: string

  /** The player's morale, in words. */
  morale: string

  /** The same morale as a number from 1 to 5, which picks the pill's colour. */
  moraleLevel: number

  /** What worries the player, in words, or `null` when nothing does. */
  concern: string | null

  /** Whether the player is suspended in the domestic competition. */
  isSuspended: boolean
}
