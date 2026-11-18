import { DOT_SEPARATOR } from '@/components/SquadPlayerProfile/constants'
import {
  toBidKey,
  toBidMeta,
  toFeeText,
  toSeasonsText,
} from '@/components/SquadPlayerProfile/utils'
import { formatEuros } from '@/utils/formatEuros'

import { BUY_OPTION_LABEL } from '../constants'

import type { LeaguePlayerLoanBidDto } from '@/types/leaguePlayerLoanBidDto'

import type { HistoryItem } from '../../HistoryList'

/**
 * Turns one loan bid into a row of the history list.
 *
 * @param bid The bid as the API returns it.
 * @returns The row: the bidding club as the title with its crest, the season, day and manager
 * under it, the loan's length with the option to buy as the second line, and the fee at the right
 * edge.
 */
export function toLoanBidItem(bid: LeaguePlayerLoanBidDto): HistoryItem {
  const length = toSeasonsText(bid.seasonsLength)

  return {
    key: toBidKey('loan', bid.id),
    hasCrest: true,
    logoUrl: bid.teamLogoUrl,
    title: bid.teamName,
    meta: toBidMeta(bid),
    detail:
      bid.buyOptionValue === null
        ? length
        : `${length}${DOT_SEPARATOR}${BUY_OPTION_LABEL} ${formatEuros(bid.buyOptionValue)}`,
    value: toFeeText(bid.loanFee),
    note: null,
  }
}
