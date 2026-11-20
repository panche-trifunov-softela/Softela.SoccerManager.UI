/** Which way a vote goes. */
export type VoteDirection = 'up' | 'down'

/** What `VoteButtons` is handed. */
export interface VoteButtonsProps {
  /** The player's name, which the buttons' accessible names carry. */
  playerName: string

  /**
   * The reader's vote on the player's current rating, or `null` when there is none. Both
   * buttons take their state from it alone: the button it names is pressed, and both always take
   * a click.
   */
  vote: VoteDirection | null

  /**
   * Called with the button the reader pressed: a new vote, the vote already shown, to take it
   * back, or the other direction, to turn the vote around.
   */
  onVote: (direction: VoteDirection) => void
}
