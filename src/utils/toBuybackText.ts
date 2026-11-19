import { BUYBACK_LINE_LABEL, BUYBACK_WITHIN_TEXT } from '@/constants/bidText'
import { formatEuros } from '@/utils/formatEuros'
import { toSeasonsText } from '@/utils/toSeasonsText'

import type { LeaguePlayerTransferBidDto } from '@/types/leaguePlayerTransferBidDto'

/**
 * Writes the buyback a transfer bid carries.
 *
 * @param bid A transfer bid as the API returns it.
 * @returns The price and how long it stays valid, such as `Buyback €25M within 2 seasons`;
 * `null` when the bid has no buyback.
 */
export function toBuybackText(
  bid: Pick<LeaguePlayerTransferBidDto, 'buybackValue' | 'buybackValidSeasons'>,
): string | null {
  if (bid.buybackValue === null) return null

  const price = `${BUYBACK_LINE_LABEL} ${formatEuros(bid.buybackValue)}`

  if (bid.buybackValidSeasons === null) return price

  return `${price} ${BUYBACK_WITHIN_TEXT} ${toSeasonsText(bid.buybackValidSeasons)}`
}
