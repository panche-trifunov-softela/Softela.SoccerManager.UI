import type { AnswerableBid } from '@/types/answerableBid'
import type { LeaguePlayerBidsDto } from '@/types/leaguePlayerBidsDto'

/**
 * Lists every pending bid for a player in one list, each with its kind.
 *
 * @param bids The bids as the API returns them.
 * @param playerId The player the bids are for.
 * @returns The transfer bids, then the loan bids, each in the order the API returned them, none of
 * them naming the player, since the panel shows his bids alone.
 */
export function toReceivedBids(bids: LeaguePlayerBidsDto, playerId: number): AnswerableBid[] {
  return [
    ...bids.transferBids.map(
      (bid): AnswerableBid => ({
        kind: 'transfer',
        id: bid.id,
        playerId,
        playerName: null,
        teamName: bid.teamName,
        fee: bid.transferFee,
      }),
    ),
    ...bids.loanBids.map(
      (bid): AnswerableBid => ({
        kind: 'loan',
        id: bid.id,
        playerId,
        playerName: null,
        teamName: bid.teamName,
        fee: bid.loanFee,
      }),
    ),
  ]
}
