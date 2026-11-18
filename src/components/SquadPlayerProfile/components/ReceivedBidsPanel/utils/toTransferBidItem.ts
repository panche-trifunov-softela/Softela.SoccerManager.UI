import { toBidKey, toBidMeta, toFeeText } from '@/components/SquadPlayerProfile/utils'

import { toBuybackText } from './toBuybackText'
import { toSwapPlayersText } from './toSwapPlayersText'

import type { LeaguePlayerTransferBidDto } from '@/types/leaguePlayerTransferBidDto'

import type { HistoryItem } from '../../HistoryList'

/**
 * Turns one transfer bid into a row of the history list.
 *
 * @param bid The bid as the API returns it.
 * @returns The row: the bidding club as the title with its crest, the season, day and manager
 * under it, the swapped players as the second line, and at the right edge the fee over the
 * buyback.
 */
export function toTransferBidItem(bid: LeaguePlayerTransferBidDto): HistoryItem {
  return {
    key: toBidKey('transfer', bid.id),
    hasCrest: true,
    logoUrl: bid.teamLogoUrl,
    title: bid.teamName,
    meta: toBidMeta(bid),
    detail: toSwapPlayersText(bid.swapPlayers),
    value: toFeeText(bid.transferFee),
    note: toBuybackText(bid),
  }
}
