import type { ReactNode } from 'react'

import type { PlayerSearchQuery } from '@/types/playerSearchQuery'
import type { PlayerSortBy } from '@/types/playerSortBy'

/** One row of the table: a player as the view shows it. */
export interface PlayerRow {
  /** The player's id. */
  id: number

  /** The player's name. */
  name: string

  /** The address of the player's photo; `null` or blank when there is none. */
  imageUrl: string | null

  /** The full name of the player's main position, shown on hover. */
  positionName: string

  /** The short name of that position, for example `CB`, as the table shows it. */
  positionShortName: string

  /** The player's age in completed years. */
  age: number

  /** The player's club, or the text the page shows when there is none. */
  club: string

  /** The player's national team, or a dash when there is none. */
  nationality: string

  /** The player's rating, or `null` when the player has no rating. */
  rating: number | null

  /** The player's market value, written in euros in the reader's locale. */
  value: string

  /** The player's wage, written in euros in the reader's locale. */
  wage: string
}

/** What the table needs of a page read. */
export interface PlayersTableResult {
  /** How many players matched in all, not just on this page. */
  totalCount: number

  /** How many players a full page holds. */
  pageSize: number
}

/** An extra last column: its heading, its size and what each cell holds. */
export interface PlayersTableActions<TRow extends PlayerRow> {
  /** The column's heading, which is visually hidden. */
  label: string

  /** The class that sizes the column. */
  className: string

  /** Renders one row's cell content. */
  render: (row: TRow) => ReactNode
}

/** What `PlayersTable` is handed. */
export interface PlayersTableProps<TRow extends PlayerRow> {
  /** The search the table shows: its sort and its page. */
  query: PlayerSearchQuery

  /** The rows to show, in the API's order. */
  rows: readonly TRow[]

  /**
   * The last finished read, or `null` before the first one and after a failed one. While a read is
   * in flight it is still the previous read's.
   */
  result: PlayersTableResult | null

  /** Whether the read for the current query is still in flight. */
  isLoading: boolean

  /** The fixed sentence that says the last finished read failed, or `null` when it did not. */
  error: string | null

  /** Called with the column the reader clicked to sort by. */
  onSort: (sortBy: PlayerSortBy) => void

  /** Called with the page the reader asked for, counting from 1. */
  onPageChange: (page: number) => void

  /** Called with the row whose name the reader clicked. */
  onOpen: (row: TRow) => void

  /** An extra last column; the table has none when this is left out. */
  actions?: PlayersTableActions<TRow>

  /**
   * Whether Position, Nationality and Wage wait for the xl width instead of lg, for a table that
   * shares the row with the docked club menu.
   */
  lateColumns?: boolean
}

/** What `usePlayersTable` exposes to the view. */
export interface PlayersTableState {
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
