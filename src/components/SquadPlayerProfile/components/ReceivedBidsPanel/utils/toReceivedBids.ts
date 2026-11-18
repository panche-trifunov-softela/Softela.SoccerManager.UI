import type { LeaguePlayerBidsDto } from '@/types/leaguePlayerBidsDto'

import type { ReceivedBid } from '../types'

/**
 * Lists every pending bid for a player in one list, each with its kind.
 *
 * @param bids The bids as the API returns them.
 * @returns The transfer bids, then the loan bids, each in the order the API returned them.
 */
export function toReceivedBids(bids: LeaguePlayerBidsDto): ReceivedBid[] {
  return [
    ...bids.transferBids.map((bid): ReceivedBid => ({ kind: 'transfer', bid })),
    ...bids.loanBids.map((bid): ReceivedBid => ({ kind: 'loan', bid })),
  ]
}
