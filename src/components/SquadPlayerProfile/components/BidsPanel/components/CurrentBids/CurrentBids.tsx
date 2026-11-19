import { HistoryList } from '@/components/HistoryList'

import { CURRENT_BIDS_HEADING } from '../../constants'

import styles from './CurrentBids.module.scss'

import type { CurrentBidsProps } from './types'

/**
 * The clubs that have a bid on a player, under the forms that place one: a heading over a list of
 * the bids, accepted deals first and then newest first, each with the bidding club, the kind of
 * bid, the season, the day and the manager. The terms of a bid are not shown.
 *
 * @param props The rows to list, and the sentence to show under them.
 * @returns The rendered section. While the bids load, when they could not be read, or when there
 * is none, the sentence shows in a live region.
 */
export function CurrentBids({ items, message }: CurrentBidsProps) {
  return (
    <section className={styles.section}>
      <h3 className={`label text-10 ${styles.heading}`}>{CURRENT_BIDS_HEADING}</h3>

      {items.length > 0 && <HistoryList items={items} />}

      <div role="status">{message !== null && <p className="label">{message}</p>}</div>
    </section>
  )
}
