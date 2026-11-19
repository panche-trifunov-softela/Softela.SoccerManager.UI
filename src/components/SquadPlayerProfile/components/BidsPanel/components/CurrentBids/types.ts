import type { HistoryItem } from '@/components/HistoryList'

/** What `CurrentBids` is handed. */
export interface CurrentBidsProps {
  /** The rows to list, one per bid, in the order to show them; empty when there is none to list. */
  items: HistoryItem[]

  /**
   * What shows under the rows: that the bids are loading, why they could not be read, or that
   * there is none; `null` when there is nothing to say.
   */
  message: string | null
}
