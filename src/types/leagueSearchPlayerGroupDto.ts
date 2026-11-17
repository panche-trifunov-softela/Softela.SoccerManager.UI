import type { LeagueSearchPlayerItemDto } from './leagueSearchPlayerItemDto'

/**
 * The players a league search found: the best matches and how many players matched in all.
 *
 * Mirrors `players` in the response of `GET /api/league-teams/{id}/search`.
 */
export interface LeagueSearchPlayerGroupDto {
  /** The best matches, at most five, in the order the search ranked them. */
  items: LeagueSearchPlayerItemDto[]

  /** How many players matched in all, not just how many `items` holds. */
  totalCount: number
}
