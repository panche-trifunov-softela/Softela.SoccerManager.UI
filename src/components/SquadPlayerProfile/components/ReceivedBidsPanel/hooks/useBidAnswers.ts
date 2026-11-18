import { useAnswerFlow } from '@/hooks/useAnswerFlow'
import { answerLoanBid, answerTransferBid } from '@/services/api'

import { BID_ANSWERS } from '../constants'
import { toBidKey, toBidSubject } from '../utils'

import type { BidAnswersState, ReceivedBid } from '../types'

/**
 * Accepts and rejects the bids received for a player, one at a time, through the shared answer
 * flow.
 *
 * - A bid is keyed by its kind and id, since a transfer bid and a loan bid can share an id.
 * - Each answer is sent to the club holding the player with the status of the pressed answer, and
 *   toasted under the bidding club's name with the words `BID_ANSWERS` lists.
 * - Only the answer is recorded; the player stays, so nothing but the bids is read again.
 *
 * @param leagueTeamId The acting club, which holds the player.
 * @param playerId The player the bids are for.
 * @param bids Every bid the panel shows, of both kinds.
 * @param refresh Reads the bids again.
 * @returns The props of each bid's answer buttons, by the key of its row.
 */
export function useBidAnswers(
  leagueTeamId: number,
  playerId: number,
  bids: readonly ReceivedBid[],
  refresh: () => void,
): BidAnswersState {
  const { sending, isLocked, answer } = useAnswerFlow({
    items: bids,
    toKey: (received) => toBidKey(received.kind, received.bid.id),
    send: (received, choice) => {
      const { status } = BID_ANSWERS[received.kind][choice]

      return received.kind === 'transfer'
        ? answerTransferBid(leagueTeamId, playerId, received.bid.id, { status })
        : answerLoanBid(leagueTeamId, playerId, received.bid.id, { status })
    },
    toMessages: (received, choice) => BID_ANSWERS[received.kind][choice],
    toToastPrefix: (received) => received.bid.teamName,
    refresh,
  })

  const answerButtonsFor: BidAnswersState['answerButtonsFor'] = (key) => {
    const received = bids.find((bid) => toBidKey(bid.kind, bid.bid.id) === key)

    if (received === undefined) return null

    return {
      subjectName: toBidSubject(received),
      sending: sending?.key === key ? sending.choice : null,
      isLocked,
      onAnswer: (choice) => {
        answer(received, choice)
      },
    }
  }

  return { answerButtonsFor }
}
