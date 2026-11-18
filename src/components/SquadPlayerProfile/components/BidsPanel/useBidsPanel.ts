import { getLeaguePlayerBidders } from '@/services/api'

import { usePlayerTabRead } from '../../hooks/usePlayerTabRead'

import { CURRENT_BIDS_READ_MESSAGES, NO_CURRENT_BIDS_MESSAGE } from './constants'
import { toCurrentBidItem } from './utils'

import type { BidsPanelState } from './types'

/**
 * Reads the clubs that have a bid on a player and works out what the current bids show.
 *
 * - The list is read when the panel appears, by the acting club, and again when `onSent` runs; the
 *   rows stay on screen until the new read settles.
 * - The rows are the bids in the order the API returns them: accepted deals first, then newest
 *   first.
 * - A sentence shows under the heading while the bids load, when they could not be read, or when
 *   the player has no bid.
 *
 * @param leagueTeamId The acting club's league team id.
 * @param playerId The player the bids are on.
 * @returns The current bids' props, and the function that reads them again.
 */
export function useBidsPanel(leagueTeamId: number, playerId: number): BidsPanelState {
  const { data, message, reload } = usePlayerTabRead(
    leagueTeamId,
    playerId,
    getLeaguePlayerBidders,
    CURRENT_BIDS_READ_MESSAGES,
  )

  const items = data === null ? [] : data.map(toCurrentBidItem)

  const isEmpty = data !== null && data.length === 0

  return {
    currentBids: { items, message: message ?? (isEmpty ? NO_CURRENT_BIDS_MESSAGE : null) },
    onSent: reload,
  }
}
