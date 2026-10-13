import { useState } from 'react'

import { DESCENDING_FIRST, INITIAL_QUERY } from './constants'

import type { PlayerSearchQuery } from '@/types/playerSearchQuery'
import type { PlayerSortBy } from '@/types/playerSortBy'

import type { PlayerFilterChange } from './components/PlayerFilters'
import type { RatingsState } from './types'

/**
 * Holds the search the Ratings page shows, and the ways to change it.
 *
 * - Any search, filter or sort change returns to page 1, since the page the
 *   reader was on may not exist in the new results.
 * - A repeated click on the sorted column flips its direction.
 * - A newly sorted column starts in the direction `DESCENDING_FIRST` gives it.
 * - Every change makes a new query object, which is what lets a repeated
 *   search read again.
 *
 * @returns The query, and the handlers that change it.
 */
export function useRatings(): RatingsState {
  const [query, setQuery] = useState<PlayerSearchQuery>(INITIAL_QUERY)

  const search = (value: string) => {
    const trimmed = value.trim()

    setQuery((current) => ({
      ...current,
      searchTerm: trimmed === '' ? undefined : trimmed,
      page: 1,
    }))
  }

  const filter = (change: PlayerFilterChange) => {
    setQuery((current) => ({ ...current, ...change, page: 1 }))
  }

  const sort = (sortBy: PlayerSortBy) => {
    setQuery((current) => ({
      ...current,
      sortBy,
      sortDescending:
        current.sortBy === sortBy ? !current.sortDescending : DESCENDING_FIRST.includes(sortBy),
      page: 1,
    }))
  }

  const goToPage = (page: number) => {
    setQuery((current) => ({ ...current, page }))
  }

  return { query, search, filter, sort, goToPage }
}
