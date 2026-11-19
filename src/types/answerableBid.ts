import type { BidKind } from './bidKind'

/**
 * One pending bid a club can answer, whichever kind it is, with what answering and naming it
 * needs.
 */
export interface AnswerableBid {
  /** Whether it is a transfer bid or a loan bid. */
  kind: BidKind

  /** The bid's id, unique only within its kind. */
  id: number

  /** The player the bid is for: the answer is sent on his route. */
  playerId: number

  /**
   * The player's name when a list shows several players' bids; `null` when it shows one player's.
   */
  playerName: string | null

  /** The bidding club's team name. */
  teamName: string

  /** The fee offered: the transfer fee or the loan fee. */
  fee: number
}
