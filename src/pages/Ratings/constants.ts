import type { PlayerSearchQuery } from '@/types/playerSearchQuery'
import type { PlayerSortBy } from '@/types/playerSortBy'

/** The search the page opens with: every player, the best rating first, 25 to a page. */
export const INITIAL_QUERY: PlayerSearchQuery = {
  sortBy: 'rating',
  sortDescending: true,
  page: 1,
  pageSize: 25,
}

/**
 * The columns whose first click sorts from the highest value down; the others start from the
 * lowest.
 */
export const DESCENDING_FIRST: readonly PlayerSortBy[] = ['rating', 'value', 'wage']
