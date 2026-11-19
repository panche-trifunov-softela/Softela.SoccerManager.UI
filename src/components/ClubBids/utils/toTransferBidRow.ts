import { PENDING_BID_STATUS } from '@/constants/bidStatus'
import { DOT_SEPARATOR } from '@/constants/bidText'
import { toBidKey } from '@/utils/toBidKey'
import { toBidMeta } from '@/utils/toBidMeta'
import { toBuybackText } from '@/utils/toBuybackText'
import { toFeeText } from '@/utils/toFeeText'
import { toSwapPlayersText } from '@/utils/toSwapPlayersText'

import { PLACED_LABEL, RECEIVED_LABEL } from '../constants'

import type { LeagueTeamTransferBidDto } from '@/types/leagueTeamTransferBidDto'

import type { ClubBidRow } from '../types'

/**
 * Turns one transfer bid of a club into a list row.
 *
 * @param bid A transfer bid as the API returns it.
 * @returns The row: the other club's crest, the player's name, whether the bid was received or
 * placed with the other club, the season, the day and the manager, the swap line, the fee and the
 * buyback. The bid can be answered only when the club received it and it is still pending.
 */
export function toTransferBidRow(bid: LeagueTeamTransferBidDto): ClubBidRow {
  const isAnswerable = bid.isReceived && bid.status === PENDING_BID_STATUS

  return {
    item: {
      key: toBidKey('transfer', bid.id),
      hasCrest: true,
      logoUrl: bid.teamLogoUrl,
      title: bid.playerName,
      meta: [bid.isReceived ? RECEIVED_LABEL : PLACED_LABEL, bid.teamName, toBidMeta(bid)].join(
        DOT_SEPARATOR,
      ),
      detail: toSwapPlayersText(bid.swapPlayers),
      value: toFeeText(bid.transferFee),
      note: toBuybackText(bid),
    },
    playerId: bid.playerId,
    playerName: bid.playerName,
    status: bid.status,
    answerable: isAnswerable
      ? {
          kind: 'transfer',
          id: bid.id,
          playerId: bid.playerId,
          playerName: bid.playerName,
          teamName: bid.teamName,
          fee: bid.transferFee,
        }
      : null,
  }
}
