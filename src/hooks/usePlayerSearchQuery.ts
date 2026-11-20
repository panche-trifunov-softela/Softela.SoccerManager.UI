import { useState } from 'react'

import { DESCENDING_FIRST, INITIAL_PLAYER_SEARCH_QUERY } from '@/constants/playerSearch'

import type { PlayerFilterChange } from '@/components/PlayerFilters'
import type { PlayerSearchQuery } from '@/types/playerSearchQuery'
import type { PlayerSearchQueryState } from '@/types/playerSearchQueryState'
import type { PlayerSortBy } from '@/types/playerSortBy'

/**
 * Holds the player search a page shows, and the ways to change it.
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
export function usePlayerSearchQuery(): PlayerSearchQueryState {
  const [query, setQuery] = useState<PlayerSearchQuery>(INITIAL_PLAYER_SEARCH_QUERY)

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
