import type { PlayerRow, PlayersTableProps } from '@/components/PlayersTable'
import type { PlayerSearchQueryState } from '@/types/playerSearchQueryState'

import type { VoteButtonsProps, VoteDirection } from './components/VoteButtons'

/** What `useRatings` exposes to the view. */
export interface RatingsState extends Pick<PlayerSearchQueryState, 'query' | 'search' | 'filter'> {
  /** What the players table is handed, less the vote column the page adds. */
  table: Omit<PlayersTableProps<RatingsRow>, 'actions' | 'lateColumns'>

  /** The props of one row's vote buttons: the player, the reader's vote, and what voting does. */
  voteButtonsFor: (row: RatingsRow) => VoteButtonsProps
}

/** One row of the Ratings table: a player with their rating and the reader's vote on it. */
export type RatingsRow = PlayerRow & {
  /** The player's rating. */
  rating: number

  /** The reader's vote on the player's current rating, as the API read it, or `null` when none. */
  myVote: VoteDirection | null

  /** The id of that vote, which removing it takes, or `null` when there is none. */
  myVoteId: number | null
}

/**
 * A change this visit made to the reader's vote on one player, kept with the rating it was made on.
 * While that rating stays current, it overrides the vote the API read.
 */
export interface CastVote {
  /** Which way the reader voted, or `null` when they removed their vote. */
  direction: VoteDirection | null

  /** The vote's id, which removing it takes, or `null` while it is being sent and once removed. */
  id: number | null

  /** The player's rating when the change was made. */
  rating: number
}

/** The changes this visit made to the reader's votes, by player id. */
export type CastVotes = Readonly<Partial<Record<number, CastVote>>>

/** What `usePlayerVotes` exposes to the page. */
export interface PlayerVotesState {
  /** The props of one row's vote buttons: the player, the reader's vote, and what voting does. */
  voteButtonsFor: (row: RatingsRow) => VoteButtonsProps
}
