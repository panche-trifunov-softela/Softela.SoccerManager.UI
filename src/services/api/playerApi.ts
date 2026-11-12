import { API_ROUTES } from './endpoints'
import { request } from './http'
import { toQueryString } from './utils'

import type { PlayerProfileDto } from '@/types/playerProfileDto'
import type { PlayerSearchQuery } from '@/types/playerSearchQuery'
import type { PlayerSearchResultDto } from '@/types/playerSearchResultDto'

/**
 * Searches the players, filtered, sorted and paged by the API.
 *
 * @param query The search, filters, sort and page; a member left out takes the
 * API's default.
 * @param signal Aborts the request, normally from the calling hook's cleanup.
 * @returns One page of the matching players, with the count of all of them.
 * @throws {ApiError} When the API answers with an error status.
 */
export function searchPlayers(
  query: PlayerSearchQuery,
  signal?: AbortSignal,
): Promise<PlayerSearchResultDto> {
  const url = `${API_ROUTES.players.search}${toQueryString({ ...query })}`

  return request<PlayerSearchResultDto>(url, { signal })
}

/**
 * Reads one player's profile from the players table, with every position they can play.
 *
 * @param playerId The player's id.
 * @param signal Aborts the request, normally from the calling hook's cleanup.
 * @returns The player's profile.
 * @throws {ApiError} When the API answers with an error status, such as 404 for an unknown player.
 */
export function getPlayerProfile(playerId: number, signal?: AbortSignal): Promise<PlayerProfileDto> {
  const path = API_ROUTES.players.profile(playerId)

  return request<PlayerProfileDto>(path, { signal })
}
