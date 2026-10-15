import { API_ROUTES } from './endpoints'
import { request } from './http'
import { toQueryString } from './utils'

import type { AvailableLeagueTeamDto } from '@/types/availableLeagueTeamDto'

/**
 * Reads every club on one league's roster, with whether each has a current manager and whether
 * the signed-in caller has applied for it.
 *
 * @param leagueId The league's id.
 * @param signal Aborts the request, normally from the calling hook's cleanup.
 * @returns The clubs, in the order the API returns them.
 * @throws {ApiError} When the API answers with an error status.
 */
export function getAvailableLeagueTeams(
  leagueId: number,
  signal?: AbortSignal,
): Promise<AvailableLeagueTeamDto[]> {
  const path = API_ROUTES.leagueTeams.available + toQueryString({ leagueId })

  return request<AvailableLeagueTeamDto[]>(path, { signal })
}
