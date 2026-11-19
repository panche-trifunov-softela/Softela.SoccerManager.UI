import { BUY_OPTION_LABEL, DOT_SEPARATOR } from '@/constants/bidText'
import { formatEuros } from '@/utils/formatEuros'
import { toSeasonsText } from '@/utils/toSeasonsText'

import type { LeaguePlayerLoanBidDto } from '@/types/leaguePlayerLoanBidDto'

/**
 * Writes the terms of a loan bid, bar its fee.
 *
 * @param bid A loan bid as the API returns it.
 * @returns The loan's length, with the option to buy after it when there is one, such as
 * `2 seasons · Buy option €25M`; just the length, such as `1 season`, when there is none.
 */
export function toLoanTermsText(
  bid: Pick<LeaguePlayerLoanBidDto, 'seasonsLength' | 'buyOptionValue'>,
): string {
  const length = toSeasonsText(bid.seasonsLength)

  if (bid.buyOptionValue === null) return length

  return `${length}${DOT_SEPARATOR}${BUY_OPTION_LABEL} ${formatEuros(bid.buyOptionValue)}`
}
