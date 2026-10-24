/** Which way a vote goes. */
export type VoteDirection = 'up' | 'down'

/** What `VoteButtons` is handed. */
export interface VoteButtonsProps {
  /** The player's name, which the buttons' accessible names carry. */
  playerName: string

  /**
   * The reader's vote on the player's current rating, or `null` when there is none. Both
   * buttons take their state from it alone: the button it names is pressed, and the other one
   * is disabled.
   */
  vote: VoteDirection | null

  /** Called with the way the reader votes. */
  onVote: (direction: VoteDirection) => void
}
