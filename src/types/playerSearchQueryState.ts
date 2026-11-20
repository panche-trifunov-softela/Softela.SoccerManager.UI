import type { PlayerFilterChange } from '@/components/PlayerFilters'

import type { PlayerSearchQuery } from './playerSearchQuery'
import type { PlayerSortBy } from './playerSortBy'

/** What `usePlayerSearchQuery` exposes to a page. */
export interface PlayerSearchQueryState {
  /** The search the page is showing: its name, filters, sort and page. */
  query: PlayerSearchQuery

  /** Searches by name; an empty value clears the search. */
  search: (value: string) => void

  /** Applies a change to the filters. */
  filter: (change: PlayerFilterChange) => void

  /** Sorts by a column, or flips the direction when it is already the sorted one. */
  sort: (sortBy: PlayerSortBy) => void

  /** Moves to a page, counting from 1. */
  goToPage: (page: number) => void
}
