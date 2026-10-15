/** Which way a vote goes. */
export type VoteDirection = 'up' | 'down'

/** What `VoteButtons` is handed. */
export interface VoteButtonsProps {
  /** The player's name, which the buttons' accessible names carry. */
  playerName: string

  /** The reader's vote on the player's current rating, or `null` when there is none. */
  vote: VoteDirection | null

  /** Whether the buttons take no click: the vote is being sent, or the reader has voted. */
  isLocked: boolean

  /** Called with the way the reader votes. */
  onVote: (direction: VoteDirection) => void
}
