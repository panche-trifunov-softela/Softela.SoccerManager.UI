import type { HistoryItem } from '@/components/HistoryList'
import type { BidAnswersState } from '@/types/bidAnswersState'

/** What `ReceivedBidsPanel` is handed. */
export interface ReceivedBidsPanelProps {
  /** The acting club, which holds the player: the league team whose manager answers the bids. */
  leagueTeamId: number

  /** The player whose received bids are shown. */
  playerId: number
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

/** What `useReceivedBidsPanel` exposes to the view. */
export interface ReceivedBidsPanelState extends BidAnswersState {
  /** The tabs, transfer then loan, or none while the bids are not there to show. */
  tabs: ReceivedBidsTab[]

  /** What shows instead of the tabs: that the bids are loading or why they could not be read. */
  message: string | null
}
