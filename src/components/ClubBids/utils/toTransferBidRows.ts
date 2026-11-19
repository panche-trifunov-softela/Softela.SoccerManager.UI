import { toTransferBidRow } from './toTransferBidRow'

import type { LeagueTeamTransferBidsDto } from '@/types/leagueTeamTransferBidsDto'

import type { ClubBidRows } from '../types'

/**
 * Turns a club's transfer bids into list rows, keeping them apart as the API does.
 *
 * @param bids The bids as the API returns them.
 * @returns The pending rows and the completed rows, each in the order the API returned them.
 */
export function toTransferBidRows(bids: LeagueTeamTransferBidsDto): ClubBidRows {
  return {
    pending: bids.pending.map(toTransferBidRow),
    completed: bids.completed.map(toTransferBidRow),
  }
}
