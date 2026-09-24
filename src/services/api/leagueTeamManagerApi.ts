import { API_ROUTES } from './endpoints'
import { request } from './http'

import type { MyLeagueTeamManagerDto } from '@/types/myLeagueTeamManagerDto'

/**
 * Returns the league team appointments belonging to the signed-in caller.
 *
 * A caller with no manager profile gets an empty list rather than a failure.
 * The backend orders the rows current-first, then most recently started.
 *
 * @param currentOnly Whether to narrow the result to appointments that are
 * still current.
 * @param signal Aborts the request, normally from the calling hook's cleanup.
 * @returns The caller's appointments.
 */
export function getMyLeagueTeamManagers(
  currentOnly: boolean,
  signal?: AbortSignal,
): Promise<MyLeagueTeamManagerDto[]> {
  const path = `${API_ROUTES.leagueTeamManagers.mine}?currentOnly=${String(currentOnly)}`

  return request<MyLeagueTeamManagerDto[]>(path, { signal })
}
