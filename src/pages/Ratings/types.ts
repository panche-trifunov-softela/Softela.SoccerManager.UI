import type { PlayerSearchQuery } from '@/types/playerSearchQuery'
import type { PlayerSortBy } from '@/types/playerSortBy'

import type { PlayerFilterChange } from './components/PlayerFilters'

/** What `useRatings` exposes to the view. */
export interface RatingsState {
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
