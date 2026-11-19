import { useBidAnswers } from '@/hooks/useBidAnswers'
import { getLeaguePlayerBids } from '@/services/api'

import {
  LOAN_BID_TAB_ID,
  LOAN_BID_TAB_LABEL,
  TRANSFER_BID_TAB_ID,
  TRANSFER_BID_TAB_LABEL,
} from '../../constants'
import { usePlayerTabRead } from '../../hooks/usePlayerTabRead'

import { BIDS_READ_MESSAGES, NO_LOAN_BIDS_MESSAGE, NO_TRANSFER_BIDS_MESSAGE } from './constants'
import { toBidTabLabel, toLoanBidItem, toReceivedBids, toTransferBidItem } from './utils'

import type { ReceivedBidsPanelState } from './types'

/**
 * Reads the pending bids for one player of the acting club and works out what the panel shows.
 *
 * - One read gives both kinds of bid. After an answer it is made again, and the rows stay on screen
 *   until the new read settles.
 * - Each tab shows its kind's bids newest first, as the API returns them, with the number of bids
 *   in its label when there are any, and says so when there are none.
 * - While the bids load, or when they could not be read, there are no tabs and a sentence shows in
 *   their place.
 *
 * @param leagueTeamId The acting club, which holds the player.
 * @param playerId The player the bids are for.
 * @returns The tabs, the sentence to show in their place, and the props of each row's answer
 * buttons.
 */
export function useReceivedBidsPanel(
  leagueTeamId: number,
  playerId: number,
): ReceivedBidsPanelState {
  const { data, message, reload } = usePlayerTabRead(
    leagueTeamId,
    playerId,
    getLeaguePlayerBids,
    BIDS_READ_MESSAGES,
  )

  const bids = data === null ? [] : toReceivedBids(data, playerId)

  const { answerButtonsFor } = useBidAnswers(leagueTeamId, bids, reload)

  if (data === null) return { tabs: [], message, answerButtonsFor }

  return {
    tabs: [
      {
        id: TRANSFER_BID_TAB_ID,
        label: toBidTabLabel(TRANSFER_BID_TAB_LABEL, data.transferBids.length),
        items: data.transferBids.map(toTransferBidItem),
        emptyMessage: data.transferBids.length === 0 ? NO_TRANSFER_BIDS_MESSAGE : null,
      },
      {
        id: LOAN_BID_TAB_ID,
        label: toBidTabLabel(LOAN_BID_TAB_LABEL, data.loanBids.length),
        items: data.loanBids.map(toLoanBidItem),
        emptyMessage: data.loanBids.length === 0 ? NO_LOAN_BIDS_MESSAGE : null,
      },
    ],
    message: null,
    answerButtonsFor,
  }
}
