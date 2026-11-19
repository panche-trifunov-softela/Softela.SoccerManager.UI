import { toLoanBidRow } from './toLoanBidRow'

import type { LeagueTeamLoanBidsDto } from '@/types/leagueTeamLoanBidsDto'

import type { ClubBidRows } from '../types'

/**
 * Turns a club's loan bids into list rows, keeping them apart as the API does.
 *
 * @param bids The bids as the API returns them.
 * @returns The pending rows and the completed rows, each in the order the API returned them.
 */
export function toLoanBidRows(bids: LeagueTeamLoanBidsDto): ClubBidRows {
  return {
    pending: bids.pending.map(toLoanBidRow),
    completed: bids.completed.map(toLoanBidRow),
  }
}
