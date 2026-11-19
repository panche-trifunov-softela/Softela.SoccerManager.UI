import { PENDING_BID_STATUS } from '@/constants/bidStatus'
import { DOT_SEPARATOR } from '@/constants/bidText'
import { toBidKey } from '@/utils/toBidKey'
import { toBidMeta } from '@/utils/toBidMeta'
import { toFeeText } from '@/utils/toFeeText'
import { toLoanTermsText } from '@/utils/toLoanTermsText'

import { PLACED_LABEL, RECEIVED_LABEL } from '../constants'

import type { LeagueTeamLoanBidDto } from '@/types/leagueTeamLoanBidDto'

import type { ClubBidRow } from '../types'

/**
 * Turns one loan bid of a club into a list row.
 *
 * @param bid A loan bid as the API returns it.
 * @returns The row: the other club's crest, the player's name, whether the bid was received or
 * placed with the other club, the season, the day and the manager, the loan's terms and the fee.
 * The bid can be answered only when the club received it and it is still pending.
 */
export function toLoanBidRow(bid: LeagueTeamLoanBidDto): ClubBidRow {
  const isAnswerable = bid.isReceived && bid.status === PENDING_BID_STATUS

  return {
    item: {
      key: toBidKey('loan', bid.id),
      hasCrest: true,
      logoUrl: bid.teamLogoUrl,
      title: bid.playerName,
      meta: [bid.isReceived ? RECEIVED_LABEL : PLACED_LABEL, bid.teamName, toBidMeta(bid)].join(
        DOT_SEPARATOR,
      ),
      detail: toLoanTermsText(bid),
      value: toFeeText(bid.loanFee),
      note: null,
    },
    playerId: bid.playerId,
    playerName: bid.playerName,
    status: bid.status,
    answerable: isAnswerable
      ? {
          kind: 'loan',
          id: bid.id,
          playerId: bid.playerId,
          playerName: bid.playerName,
          teamName: bid.teamName,
          fee: bid.loanFee,
        }
      : null,
  }
}
