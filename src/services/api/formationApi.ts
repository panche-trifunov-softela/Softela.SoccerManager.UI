import { API_ROUTES } from './endpoints'
import { request } from './http'

import type { FormationDto } from '@/types/formationDto'

/**
 * Reads every formation.
 *
 * @param signal Aborts the request, normally from the calling hook's cleanup.
 * @returns The formations, in the order the API returns them.
 * @throws {ApiError} When the API answers with an error status.
 */
export function getFormations(signal?: AbortSignal): Promise<FormationDto[]> {
  return request<FormationDto[]>(API_ROUTES.formations.list, { signal })
}
