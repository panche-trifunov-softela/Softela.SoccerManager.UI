import type { LeagueSearchTeamItemDto } from './leagueSearchTeamItemDto'

/**
 * The clubs a league search found: the best matches and how many clubs matched in all.
 *
 * Mirrors `teams` in the response of `GET /api/league-teams/{id}/search`.
 */
export interface LeagueSearchTeamGroupDto {
  /** The best matches, at most five, in the order the search ranked them. */
  items: LeagueSearchTeamItemDto[]

  /** How many clubs matched in all, not just how many `items` holds. */
  totalCount: number
}
