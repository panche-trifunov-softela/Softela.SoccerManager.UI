import { useState } from 'react'

import { createManagerPlayerRatingVote, toErrorMessage } from '@/services/api'
import { toast } from '@/store/toast'

import { VOTE_FAILED_MESSAGE, VOTE_SENT_MESSAGE } from '../constants'

import type { VoteButtonsProps, VoteDirection } from '../components/VoteButtons'
import type { CastVote, PlayerRow, PlayerVotesState } from '../types'

/**
 * Casts the reader's votes on the players' current ratings. A vote shows as its pressed button
 * from the click on, and its outcome is also put into words in a toast.
 *
 * - Players are voted on independently. A row that already shows a vote, sent or still being
 *   sent, takes no other.
 * - A vote cast here is kept with the rating it was cast on, and shows until that rating
 *   changes. Otherwise a row shows the vote the API read.
 * - A vote that goes through says so in a toast naming the player.
 * - A failed vote is taken back, so the buttons are as they were, and a toast says which player
 *   and why.
 *
 * @returns The props of each row's vote buttons.
 */
export function usePlayerVotes(): PlayerVotesState {
  const [castVotes, setCastVotes] = useState<Readonly<Partial<Record<number, CastVote>>>>({})

  const voteOf = (row: PlayerRow): VoteDirection | null => {
    const cast = castVotes[row.id]

    return cast !== undefined && cast.rating === row.rating ? cast.direction : row.myVote
  }

  const vote = (row: PlayerRow, direction: VoteDirection) => {
    // One vote per rating: while a vote is shown, sent or still being sent, a click does
    // nothing.
    if (voteOf(row) !== null) return

    const cast: CastVote = { direction, rating: row.rating }

    setCastVotes((votes) => ({ ...votes, [row.id]: cast }))

    createManagerPlayerRatingVote({ playerId: row.id, upOrDown: direction === 'up' }).then(
      () => {
        toast.success(`${row.name}: ${VOTE_SENT_MESSAGE}`)
      },
      (cause: unknown) => {
        // Only this click's vote is taken back: a vote cast since, on a newer rating, stays.
        setCastVotes((votes) => {
          if (votes[row.id] !== cast) return votes

          const rest = { ...votes }

          delete rest[row.id]

          return rest
        })

        toast.error(`${row.name}: ${toErrorMessage(cause, VOTE_FAILED_MESSAGE)}`)
      },
    )
  }

  const voteButtonsFor = (row: PlayerRow): VoteButtonsProps => ({
    playerName: row.name,
    vote: voteOf(row),
    onVote: (direction) => {
      vote(row, direction)
    },
  })

  return { voteButtonsFor }
}
