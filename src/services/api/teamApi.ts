import { API_ROUTES } from './endpoints'
import { request } from './http'

import type { TeamDto } from '@/types/teamDto'

/**
 * Reads every team.
 *
 * @param signal Aborts the request, normally from the calling hook's cleanup.
 * @returns The teams, ordered by name.
 * @throws {ApiError} When the API answers with an error status.
 */
export function getTeams(signal?: AbortSignal): Promise<TeamDto[]> {
  return request<TeamDto[]>(API_ROUTES.teams.list, { signal })
}
