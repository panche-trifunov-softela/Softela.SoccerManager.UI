import { toBidKey } from '@/utils/toBidKey'
import { toBidMeta } from '@/utils/toBidMeta'
import { toFeeText } from '@/utils/toFeeText'
import { toLoanTermsText } from '@/utils/toLoanTermsText'

import type { HistoryItem } from '@/components/HistoryList'
import type { LeaguePlayerLoanBidDto } from '@/types/leaguePlayerLoanBidDto'

/**
 * Turns one loan bid into a row of the history list.
 *
 * @param bid The bid as the API returns it.
 * @returns The row: the bidding club as the title with its crest, the season, day and manager
 * under it, the loan's length with the option to buy as the second line, and the fee at the right
 * edge.
 */
export function toLoanBidItem(bid: LeaguePlayerLoanBidDto): HistoryItem {
  return {
    key: toBidKey('loan', bid.id),
    hasCrest: true,
    logoUrl: bid.teamLogoUrl,
    title: bid.teamName,
    meta: toBidMeta(bid),
    detail: toLoanTermsText(bid),
    value: toFeeText(bid.loanFee),
    note: null,
  }
}
