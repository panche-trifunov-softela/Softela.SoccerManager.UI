import type { TransferStatus } from './transferStatus'

/** How one answer to one kind of bid is sent, and how a toast puts its outcome into words. */
export interface BidAnswerSpec {
  /** The status the API is sent for the answer. */
  status: TransferStatus

  /** What shows, after the bidding club's name, when the answer went through. */
  answeredMessage: string

  /**
   * The sentence a toast shows, after the bidding club's name, when the failure itself says
   * nothing more; it is the fallback of `toErrorMessage`.
   */
  failedMessage: string
}
