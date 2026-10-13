import { API_ROUTES } from './endpoints'
import { request } from './http'

import type { NationalTeamDto } from '@/types/nationalTeamDto'

/**
 * Reads every national team.
 *
 * @param signal Aborts the request, normally from the calling hook's cleanup.
 * @returns The national teams, ordered by name.
 * @throws {ApiError} When the API answers with an error status.
 */
export function getNationalTeams(signal?: AbortSignal): Promise<NationalTeamDto[]> {
  return request<NationalTeamDto[]>(API_ROUTES.nationalTeams.list, { signal })
}
