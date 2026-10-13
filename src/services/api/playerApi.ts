import { API_ROUTES } from './endpoints'
import { request } from './http'
import { toQueryString } from './utils'

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
