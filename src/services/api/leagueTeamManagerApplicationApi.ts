import { API_ROUTES } from './endpoints'
import { request } from './http'

import type { CreatedResourceDto } from '@/types/createdResourceDto'
import type { CreateLeagueTeamManagerApplicationRequest } from '@/types/createLeagueTeamManagerApplicationRequest'

/**
 * Applies, as the signed-in caller, to manage one club in its league.
 *
 * @param application The club applied for.
 * @returns The new application's id.
 * @throws {ApiError} When the API answers with an error status. A 400 carries its reasons in
 * `validationErrors`.
 */
export function createLeagueTeamManagerApplication(
  application: CreateLeagueTeamManagerApplicationRequest,
): Promise<CreatedResourceDto> {
  return request<CreatedResourceDto>(API_ROUTES.leagueTeamManagerApplications.create, {
    method: 'POST',
    body: application,
  })
}
