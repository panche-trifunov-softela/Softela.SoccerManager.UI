import { CLUB_NOT_FOUND_MESSAGE } from '@/constants/clubNotFound'
import { useBidAnswers } from '@/hooks/useBidAnswers'
import { useOpenPlayerProfile } from '@/hooks/useOpenPlayerProfile'
import { useSelectedClub } from '@/hooks/useSelectedClub'
import { toClubSubtitle } from '@/utils/toClubSubtitle'

import {
  CLUB_BIDS_TEXTS,
  COMPLETED_BID_LABELS,
  COMPLETED_HEADING,
  PENDING_HEADING,
} from './constants'
import { useClubBidsRead, useReadOnPanelClose } from './hooks'

import type { AnswerableBid } from '@/types/answerableBid'
import type { BidKind } from '@/types/bidKind'

import type { ClubBidActions, ClubBidsSection, ClubBidsState } from './types'

/**
 * Reads a club's bids of one kind and works out what the page shows.
 *
 * - The club is the one the address selects. The bids are read once its id is known, and again
 *   after an answer and whenever a side panel closes, since the panel may have answered a bid.
 * - The sections are the pending bids, then the completed ones, each saying so when it is empty.
 *   While the bids load, or when they could not be read, there are none and a sentence shows.
 * - A pending bid the club received can be answered; a completed one carries the state of its
 *   deal. The answer is sent for the bid's own player.
 * - A click on a row's player opens his profile in the side panel.
 *
 * @param kind Which kind of bid the page lists.
 * @returns The page's heading and subtitle, the sentence to show, the sections, what each row has
 * at its end and what a click on a player opens.
 */
export function useClubBids(kind: BidKind): ClubBidsState {
  const texts = CLUB_BIDS_TEXTS[kind]

  const { leagueTeamId, club } = useSelectedClub()

  const { rows, message: readMessage, reload } = useClubBidsRead(leagueTeamId, kind)

  useReadOnPanelClose(reload)

  const pendingRows = rows === null ? [] : rows.pending

  const answerable = pendingRows
    .map((row) => row.answerable)
    .filter((bid): bid is AnswerableBid => bid !== null)

  const { answerButtonsFor } = useBidAnswers(leagueTeamId ?? 0, answerable, reload)

  const { openPlayerProfile } = useOpenPlayerProfile()

  const allRows = rows === null ? [] : [...rows.pending, ...rows.completed]

  const sections: ClubBidsSection[] =
    rows === null
      ? []
      : [
          {
            id: 'pending',
            heading: PENDING_HEADING,
            items: rows.pending.map((row) => row.item),
            emptyMessage: rows.pending.length === 0 ? texts.noPending : null,
          },
          {
            id: 'completed',
            heading: COMPLETED_HEADING,
            items: rows.completed.map((row) => row.item),
            emptyMessage: rows.completed.length === 0 ? texts.noCompleted : null,
          },
        ]

  const actionsFor = (key: string): ClubBidActions => {
    const props = answerButtonsFor(key)

    if (props !== null) return { kind: 'answer', props }

    const row = allRows.find((candidate) => candidate.item.key === key)

    if (row === undefined) return null

    const label = COMPLETED_BID_LABELS[row.status]

    return label === null ? null : { kind: 'status', status: row.status, label }
  }

  const openPlayer = (key: string) => {
    const row = allRows.find((candidate) => candidate.item.key === key)

    if (row === undefined) return

    openPlayerProfile({ playerId: row.playerId, name: row.playerName })
  }

  return {
    title: texts.title,
    subtitle: club === null ? null : toClubSubtitle(club),
    message: leagueTeamId === null ? CLUB_NOT_FOUND_MESSAGE : readMessage,
    sections,
    actionsFor,
    openPlayer,
  }
}
