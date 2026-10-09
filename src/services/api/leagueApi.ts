import { API_ROUTES } from './endpoints'
import { request } from './http'

import type { LeagueDto } from '@/types/leagueDto'

/**
 * Reads the leagues the signed-in caller does not manage a club in: at most
 * ten, newest first.
 *
 * @param searchTerm Keeps only the leagues whose name contains it, or `null`
 * to keep every one.
 * @param signal Aborts the request, normally from the calling hook's cleanup.
 * @returns The leagues, in the API's order.
 * @throws {ApiError} When the API answers with an error status.
 */
export function getLeagues(searchTerm: string | null, signal?: AbortSignal): Promise<LeagueDto[]> {
  // URLSearchParams rather than encodeURIComponent: a lone surrogate in the
  // search becomes U+FFFD instead of a synchronous throw that would escape the
  // caller's promise chain.
  const path =
    searchTerm === null
      ? API_ROUTES.leagues.list
      : `${API_ROUTES.leagues.list}?${new URLSearchParams({ searchTerm }).toString()}`

  return request<LeagueDto[]>(path, { signal })
}
