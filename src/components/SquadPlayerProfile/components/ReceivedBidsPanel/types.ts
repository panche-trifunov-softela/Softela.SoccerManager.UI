import type { AnswerButtonsProps } from '@/components/AnswerButtons'
import type { LeaguePlayerLoanBidDto } from '@/types/leaguePlayerLoanBidDto'
import type { LeaguePlayerTransferBidDto } from '@/types/leaguePlayerTransferBidDto'
import type { TransferStatus } from '@/types/transferStatus'

import type { HistoryItem } from '../HistoryList'

/** The two kinds of bid a player can receive. */
export type BidKind = 'transfer' | 'loan'

/** What `ReceivedBidsPanel` is handed. */
export interface ReceivedBidsPanelProps {
  /** The acting club, which holds the player: the league team whose manager answers the bids. */
  leagueTeamId: number

  /** The player whose received bids are shown. */
  playerId: number
}

/** One pending bid, whichever kind it is, with the kind that tells which fields it has. */
export type ReceivedBid =
  | {
      /** The bid is a transfer bid. */
      kind: 'transfer'

      /** The bid as the API returned it. */
      bid: LeaguePlayerTransferBidDto
    }
  | {
      /** The bid is a loan bid. */
      kind: 'loan'

      /** The bid as the API returned it. */
      bid: LeaguePlayerLoanBidDto
    }

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

/** One kind of bid as the panel's strip shows it: its tab and the list under it. */
export interface ReceivedBidsTab {
  /** The id of the tab. */
  id: string

  /** The words on the tab's button, with the number of bids when there are any. */
  label: string

  /** The rows to list, one per bid, newest first; empty when there is no bid of this kind. */
  items: HistoryItem[]

  /** What shows when there is no bid of this kind, or `null` when there is at least one. */
  emptyMessage: string | null
}

/** What `useBidAnswers` exposes. */
export interface BidAnswersState {
  /**
   * The props of the answer buttons of the row with the given key: the phrase naming the bid, the
   * answer under way from them, whether they refuse clicks, and what answering does. `null` when
   * no bid has that key.
   */
  answerButtonsFor: (key: string) => AnswerButtonsProps | null
}

/** What `useReceivedBidsPanel` exposes to the view. */
export interface ReceivedBidsPanelState extends BidAnswersState {
  /** The tabs, transfer then loan, or none while the bids are not there to show. */
  tabs: ReceivedBidsTab[]

  /** What shows instead of the tabs: that the bids are loading or why they could not be read. */
  message: string | null
}
