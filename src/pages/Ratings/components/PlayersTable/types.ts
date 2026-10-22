import type { PlayerSearchQuery } from '@/types/playerSearchQuery'
import type { PlayerSearchResultDto } from '@/types/playerSearchResultDto'
import type { PlayerSortBy } from '@/types/playerSortBy'

import type { VoteButtonsProps, VoteDirection } from './components/VoteButtons'

/** What `PlayersTable` is handed. */
export interface PlayersTableProps {
  /** The search the table shows: its name, filters, sort and page. */
  query: PlayerSearchQuery

  /** Called with the column the reader clicked to sort by. */
  onSort: (sortBy: PlayerSortBy) => void

  /** Called with the page the reader asked for, counting from 1. */
  onPageChange: (page: number) => void
}

/** One row of the table: a player as the view shows it. */
export interface PlayerRow {
  /** The player's id. */
  id: number

  /** The player's name. */
  name: string

  /** The address of the player's photo, or `null` when there is none. */
  imageUrl: string | null

  /** The player's main position, or a dash when there is none. */
  position: string

  /** The player's age in completed years. */
  age: number

  /** The player's club, or a dash when there is none. */
  club: string

  /** The player's national team, or a dash when there is none. */
  nationality: string

  /** The player's rating. */
  rating: number

  /** The player's market value, written in euros in the reader's locale. */
  value: string

  /** The player's wage, written in euros in the reader's locale. */
  wage: string

  /** The reader's vote on the player's current rating, as the API read it, or `null` when none. */
  myVote: VoteDirection | null
}

/** One finished read, kept with the query it was made for. */
export interface PlayersRead {
  /** The query the read was made for. */
  query: PlayerSearchQuery

  /** The page of players read, or `null` when the read failed. */
  result: PlayerSearchResultDto | null

  /** The fixed sentence that says the read failed, or `null` when it did not. */
  error: string | null
}

/** What `usePlayersTable` exposes to the view. */
export interface PlayersTableState {
  /** The rows to show, in the API's order. */
  rows: readonly PlayerRow[]

  /**
   * Whether the read for the current query is still in flight. While it is, the rows are still the
   * previous read's.
   */
  isLoading: boolean

  /**
   * What shows under the headings instead of rows: that they are loading, that the read failed,
   * that the page is past the end, or that nothing matched. `null` when the table shows rows.
   */
  message: string | null

  /** The column the rows are sorted by. */
  sortBy: PlayerSortBy

  /** Whether the sort runs from the highest value down. */
  sortDescending: boolean

  /** The page and the count of all matches, for example `Page 2 of 272 · 6,781 players`. */
  summary: string

  /** Whether there is a page before this one. */
  canGoBack: boolean

  /** Whether there is a page after this one. */
  canGoForward: boolean

  /** Moves to the page before this one. */
  goToPrevious: () => void

  /** Moves to the page after this one. */
  goToNext: () => void
}

/** A vote the reader cast in this visit, kept with the rating it was cast on. */
export interface CastVote {
  /** Which way the reader voted. */
  direction: VoteDirection

  /** The player's rating when the vote was cast. */
  rating: number
}

/** What `usePlayerVotes` exposes to the table. */
export interface PlayerVotesState {
  /** The props of one row's vote buttons: the player, the reader's vote, and what voting does. */
  voteButtonsFor: (row: PlayerRow) => VoteButtonsProps
}
