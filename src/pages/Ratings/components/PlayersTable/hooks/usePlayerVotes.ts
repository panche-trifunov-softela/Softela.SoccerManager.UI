import { useState } from 'react'

import { createManagerPlayerRatingVote, toErrorMessage } from '@/services/api'
import { toast } from '@/store/toast'

import { VOTE_FAILED_MESSAGE, VOTE_SENT_MESSAGE } from '../constants'

import type { VoteButtonsProps, VoteDirection } from '../components/VoteButtons'
import type { CastVote, PlayerRow, PlayerVotesState } from '../types'

/**
 * Casts the reader's votes on the players' current ratings. A vote that goes through shows as
 * its pressed button, and both outcomes are also put into words in a toast.
 *
 * - Players are voted on independently. A player's buttons take no click while their vote is
 *   being sent, or once the reader has voted on the player's current rating.
 * - A vote cast here is kept with the rating it was cast on, and shows until that rating
 *   changes. Otherwise a row shows the vote the API read.
 * - A vote that goes through says so in a toast naming the player.
 * - A failed vote leaves the buttons as they were, and says which player and why in a toast.
 *
 * @returns The props of each row's vote buttons.
 */
export function usePlayerVotes(): PlayerVotesState {
  const [castVotes, setCastVotes] = useState<Readonly<Partial<Record<number, CastVote>>>>({})
  const [sendingIds, setSendingIds] = useState<readonly number[]>([])

  const voteOf = (row: PlayerRow): VoteDirection | null => {
    const cast = castVotes[row.id]

    return cast !== undefined && cast.rating === row.rating ? cast.direction : row.myVote
  }

  const isLocked = (row: PlayerRow) => sendingIds.includes(row.id) || voteOf(row) !== null

  const vote = (row: PlayerRow, direction: VoteDirection) => {
    if (isLocked(row)) return

    setSendingIds((ids) => [...ids, row.id])

    // Both handlers sit in one `then`, so a throw while recording a sent vote cannot be
    // reported as a failed one.
    createManagerPlayerRatingVote({ playerId: row.id, upOrDown: direction === 'up' })
      .then(
        () => {
          setCastVotes((votes) => ({ ...votes, [row.id]: { direction, rating: row.rating } }))

          toast.success(`${row.name}: ${VOTE_SENT_MESSAGE}`)
        },
        (cause: unknown) => {
          toast.error(`${row.name}: ${toErrorMessage(cause, VOTE_FAILED_MESSAGE)}`)
        },
      )
      .finally(() => {
        setSendingIds((ids) => ids.filter((id) => id !== row.id))
      })
  }

  const voteButtonsFor = (row: PlayerRow): VoteButtonsProps => ({
    playerName: row.name,
    vote: voteOf(row),
    isLocked: isLocked(row),
    onVote: (direction) => {
      vote(row, direction)
    },
  })

  return { voteButtonsFor }
}
