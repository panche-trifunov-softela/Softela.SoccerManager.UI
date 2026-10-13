import type { PlayerSearchItemDto } from './playerSearchItemDto'

/**
 * One page of the players a search found.
 *
 * Mirrors the response of `GET /api/players/search`.
 */
export interface PlayerSearchResultDto {
  /** The players on this page, in the order the search asked for. */
  items: PlayerSearchItemDto[]

  /** How many players matched in all, not just on this page. */
  totalCount: number

  /** The page these players are from, counting from 1. */
  page: number

  /** How many players a full page holds. */
  pageSize: number
}
