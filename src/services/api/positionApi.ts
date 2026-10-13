import { API_ROUTES } from './endpoints'
import { request } from './http'

import type { PositionDto } from '@/types/positionDto'

/**
 * Reads every position.
 *
 * @param signal Aborts the request, normally from the calling hook's cleanup.
 * @returns The positions, ordered by name.
 * @throws {ApiError} When the API answers with an error status.
 */
export function getPositions(signal?: AbortSignal): Promise<PositionDto[]> {
  return request<PositionDto[]>(API_ROUTES.positions.list, { signal })
}
