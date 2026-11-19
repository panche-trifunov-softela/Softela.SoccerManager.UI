import { BID_ANSWERS } from '@/constants/bidAnswers'
import { useAnswerFlow } from '@/hooks/useAnswerFlow'
import { answerLoanBid, answerTransferBid } from '@/services/api'
import { toBidKey } from '@/utils/toBidKey'
import { toBidSubject } from '@/utils/toBidSubject'

import type { AnswerableBid } from '@/types/answerableBid'
import type { BidAnswersState } from '@/types/bidAnswersState'

/**
 * Accepts and rejects pending bids, one at a time, through the shared answer flow.
 *
 * - A bid is keyed by its kind and id, since a transfer bid and a loan bid can share an id.
 * - Each answer is sent to the club holding the bid's player with the status of the pressed answer,
 *   and toasted under the bidding club's name with the words `BID_ANSWERS` lists.
 * - Only the answer is recorded; the player stays, so nothing but the bids is read again.
 *
 * @param leagueTeamId The acting club: the club holding the players, whose manager answers.
 * @param bids Every bid that can be answered, of both kinds, each carrying its player.
 * @param refresh Reads the bids again.
 * @returns The props of each bid's answer buttons, by the key of its row.
 */
export function useBidAnswers(
  leagueTeamId: number,
  bids: readonly AnswerableBid[],
  refresh: () => void,
): BidAnswersState {
  const { sending, isLocked, answer } = useAnswerFlow({
    items: bids,
    toKey: (bid) => toBidKey(bid.kind, bid.id),
    send: (bid, choice) => {
      const { status } = BID_ANSWERS[bid.kind][choice]

      return bid.kind === 'transfer'
        ? answerTransferBid(leagueTeamId, bid.playerId, bid.id, { status })
        : answerLoanBid(leagueTeamId, bid.playerId, bid.id, { status })
    },
    toMessages: (bid, choice) => BID_ANSWERS[bid.kind][choice],
    toToastPrefix: (bid) => bid.teamName,
    refresh,
  })

  const answerButtonsFor: BidAnswersState['answerButtonsFor'] = (key) => {
    const bid = bids.find((candidate) => toBidKey(candidate.kind, candidate.id) === key)

    if (bid === undefined) return null

    return {
      subjectName: toBidSubject(bid),
      sending: sending?.key === key ? sending.choice : null,
      isLocked,
      onAnswer: (choice) => {
        answer(bid, choice)
      },
    }
  }

  return { answerButtonsFor }
}
