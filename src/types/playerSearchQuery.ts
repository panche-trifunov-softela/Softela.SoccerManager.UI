import type { PlayerSortBy } from './playerSortBy'

/**
 * The query parameters of `GET /api/players/search`. Every one is optional;
 * the API applies its own default to each one left out.
 *
 * Mirrors the query of `GET /api/players/search`.
 */
export interface PlayerSearchQuery {
  /** Keeps only the players whose name contains it; at most 100 characters. */
  searchTerm?: string

  /** Keeps only the players whose main position this is. */
  positionId?: number

  /** Keeps only the players of this team. */
  teamId?: number

  /** Keeps only the players of this national team. */
  nationalTeamId?: number

  /** Keeps only the players rated at least this, from 1 to 100. */
  minRating?: number

  /** Keeps only the players rated at most this, from 1 to 100. */
  maxRating?: number

  /** What to sort by; the API's default is `rating`. */
  sortBy?: PlayerSortBy

  /** Whether to sort from the highest value down; the API's default is `true`. */
  sortDescending?: boolean

  /** The page to read, counting from 1; the API's default is 1. */
  page?: number

  /** How many players a page holds, from 1 to 100; the API's default is 25. */
  pageSize?: number
}
