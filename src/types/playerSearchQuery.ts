import type { PlayerSortBy } from './playerSortBy'

/**
 * The query parameters of both player searches, `GET /api/players/search` and
 * `GET /api/league-teams/{id}/league-players`. Every one is optional; the API applies its
 * own default to each one left out.
 */
export interface PlayerSearchQuery {
  /** Keeps only the players whose name contains it; at most 100 characters. */
  searchTerm?: string

  /** Keeps only the players whose main position this is. */
  positionId?: number

  /**
   * Keeps only the players at this club: the real-life club for the players search; for the
   * league player search, the club of the registration shown for him in the league (the searching
   * club's own first, else his lowest), which a free agent never matches.
   */
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
