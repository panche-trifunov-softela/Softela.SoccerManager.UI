import {
  LOAN_BID_TAB_LABEL,
  TRANSFER_BID_TAB_LABEL,
} from '@/components/SquadPlayerProfile/constants'
import { ACCEPTED_BID_STATUS } from '@/constants/bidStatus'
import { ACCEPTED_BID_LABEL, DOT_SEPARATOR } from '@/constants/bidText'
import { toBidKey } from '@/utils/toBidKey'
import { toBidMeta } from '@/utils/toBidMeta'

import type { HistoryItem } from '@/components/HistoryList'
import type { LeaguePlayerBidderDto } from '@/types/leaguePlayerBidderDto'

/**
 * Turns one club's bid on a player into a row of the history list. The terms of the bid are not
 * part of the row.
 *
 * @param bid The bid as the API returns it.
 * @returns The row: the bidding club as the title with its crest, the kind of bid, the season, the
 * day and the manager under it, and `Accepted` at the right edge when the deal is agreed but not
 * completed yet.
 */
export function toCurrentBidItem(bid: LeaguePlayerBidderDto): HistoryItem {
  const kind = bid.isLoan ? 'loan' : 'transfer'

  const kindLabel = bid.isLoan ? LOAN_BID_TAB_LABEL : TRANSFER_BID_TAB_LABEL

  return {
    key: toBidKey(kind, bid.id),
    hasCrest: true,
    logoUrl: bid.teamLogoUrl,
    title: bid.teamName,
    meta: [kindLabel, toBidMeta(bid)].join(DOT_SEPARATOR),
    detail: null,
    value: bid.status === ACCEPTED_BID_STATUS ? ACCEPTED_BID_LABEL : null,
    note: null,
  }
}
