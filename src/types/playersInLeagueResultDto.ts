import type { PlayersInLeagueItemDto } from './playersInLeagueItemDto'

/**
 * One page of the players a League player search found.
 *
 * Mirrors the response of `GET /api/league-teams/{id}/league-players`.
 */
export interface PlayersInLeagueResultDto {
  /** The players on this page, in the order the search asked for. */
  items: PlayersInLeagueItemDto[]

  /** How many players matched in all, not just on this page. */
  totalCount: number

  /** The page these players are from, counting from 1. */
  page: number

  /** How many players a full page holds. */
  pageSize: number
}
