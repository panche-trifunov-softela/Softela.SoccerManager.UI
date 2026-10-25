import { useRef, useState } from 'react'

import {
  createManagerPlayerRatingVote,
  deleteManagerPlayerRatingVote,
  toErrorMessage,
  updateManagerPlayerRatingVote,
} from '@/services/api'
import { toast } from '@/store/toast'

import {
  VOTE_CHANGE_FAILED_MESSAGE,
  VOTE_CHANGED_MESSAGE,
  VOTE_FAILED_MESSAGE,
  VOTE_REMOVE_FAILED_MESSAGE,
  VOTE_REMOVED_MESSAGE,
  VOTE_SENT_MESSAGE,
} from '../constants'
import { replaceCastVote } from '../utils'

import type { VoteButtonsProps, VoteDirection } from '../components/VoteButtons'
import type { CastVote, CastVotes, PlayerRow, PlayerVotesState } from '../types'

/**
 * Casts, changes and removes the reader's votes on the players' current ratings. A change shows on
 * the buttons from the click on, and its outcome is also put into words in a toast.
 *
 * - A row with no vote takes one. A click on the vote a row shows removes it, and a click on the
 *   other arrow turns the vote around.
 * - Players are voted on independently, and one player's requests run one at a time: while a vote,
 *   a change or a removal is being sent, clicks on that player do nothing.
 * - A change made here is kept with the rating it was made on, and shows until that rating
 *   changes. Otherwise a row shows the vote the API read.
 * - A change that goes through says so in a toast naming the player.
 * - A failed change is undone, so the buttons are as they were, and a toast says which player and
 *   why.
 *
 * @returns The props of each row's vote buttons.
 */
export function usePlayerVotes(): PlayerVotesState {
  const [castVotes, setCastVotes] = useState<CastVotes>({})

  // The players with a request in flight. Nothing renders from it, so it is a ref, not state.
  const sendingIds = useRef(new Set<number>())

  const castOf = (row: PlayerRow): CastVote | undefined => {
    const cast = castVotes[row.id]

    return cast?.rating === row.rating ? cast : undefined
  }

  const myVoteOf = (row: PlayerRow): Pick<PlayerRow, 'myVote' | 'myVoteId'> => {
    const cast = castOf(row)

    return cast === undefined
      ? { myVote: row.myVote, myVoteId: row.myVoteId }
      : { myVote: cast.direction, myVoteId: cast.id }
  }

  const castVote = (row: PlayerRow, direction: VoteDirection) => {
    const sending: CastVote = { direction, id: null, rating: row.rating }
    const previous = castVotes[row.id]

    sendingIds.current.add(row.id)
    setCastVotes((votes) => ({ ...votes, [row.id]: sending }))

    createManagerPlayerRatingVote({ playerId: row.id, upOrDown: direction === 'up' })
      .then(
        ({ id }) => {
          // The vote keeps the id the API gave it: removing the vote later takes it.
          setCastVotes((votes) => replaceCastVote(votes, row.id, sending, { ...sending, id }))

          toast.success(`${row.name}: ${VOTE_SENT_MESSAGE}`)
        },
        (cause: unknown) => {
          setCastVotes((votes) => replaceCastVote(votes, row.id, sending, previous))

          toast.error(`${row.name}: ${toErrorMessage(cause, VOTE_FAILED_MESSAGE)}`)
        },
      )
      .finally(() => {
        sendingIds.current.delete(row.id)
      })
  }

  const changeVote = (row: PlayerRow, direction: VoteDirection, id: number) => {
    // The vote keeps its id: the update only turns its direction.
    const sending: CastVote = { direction, id, rating: row.rating }
    const previous = castVotes[row.id]

    sendingIds.current.add(row.id)
    setCastVotes((votes) => ({ ...votes, [row.id]: sending }))

    updateManagerPlayerRatingVote({ id, upOrDown: direction === 'up' })
      .then(
        () => {
          toast.success(`${row.name}: ${VOTE_CHANGED_MESSAGE}`)
        },
        (cause: unknown) => {
          setCastVotes((votes) => replaceCastVote(votes, row.id, sending, previous))

          toast.error(`${row.name}: ${toErrorMessage(cause, VOTE_CHANGE_FAILED_MESSAGE)}`)
        },
      )
      .finally(() => {
        sendingIds.current.delete(row.id)
      })
  }

  const removeVote = (row: PlayerRow, id: number) => {
    const removing: CastVote = { direction: null, id: null, rating: row.rating }
    const previous = castVotes[row.id]

    sendingIds.current.add(row.id)
    setCastVotes((votes) => ({ ...votes, [row.id]: removing }))

    deleteManagerPlayerRatingVote(id)
      .then(
        () => {
          toast.success(`${row.name}: ${VOTE_REMOVED_MESSAGE}`)
        },
        (cause: unknown) => {
          setCastVotes((votes) => replaceCastVote(votes, row.id, removing, previous))

          toast.error(`${row.name}: ${toErrorMessage(cause, VOTE_REMOVE_FAILED_MESSAGE)}`)
        },
      )
      .finally(() => {
        sendingIds.current.delete(row.id)
      })
  }

  const vote = (row: PlayerRow, direction: VoteDirection) => {
    if (sendingIds.current.has(row.id)) return

    const { myVote, myVoteId } = myVoteOf(row)

    if (myVote === null) {
      castVote(row, direction)

      return
    }

    // A vote read from an API build that sends no vote ids has nothing to be changed or removed by.
    if (myVoteId === null) return

    // The arrow already shown removes the vote; the other arrow turns it around.
    if (myVote === direction) {
      removeVote(row, myVoteId)

      return
    }

    changeVote(row, direction, myVoteId)
  }

  const voteButtonsFor = (row: PlayerRow): VoteButtonsProps => ({
    playerName: row.name,
    vote: myVoteOf(row).myVote,
    onVote: (direction) => {
      vote(row, direction)
    },
  })

  return { voteButtonsFor }
}
