import { API_ROUTES } from './endpoints'
import { request } from './http'

import type { CreatedResourceDto } from '@/types/createdResourceDto'
import type { CreateLeagueTeamManagerApplicationRequest } from '@/types/createLeagueTeamManagerApplicationRequest'
import type { IncomingLeagueTeamManagerApplicationDto } from '@/types/incomingLeagueTeamManagerApplicationDto'
import type { MyLeagueTeamManagerApplicationDto } from '@/types/myLeagueTeamManagerApplicationDto'

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

/**
 * Returns the pending applications belonging to the signed-in caller that can still be accepted.
 *
 * The backend decides which applications are listed and orders them newest first. A caller with
 * no manager profile gets an empty list rather than a failure.
 *
 * @param signal Aborts the request, normally from the calling hook's cleanup.
 * @returns The caller's applications.
 */
export function getMyLeagueTeamManagerApplications(
  signal?: AbortSignal,
): Promise<MyLeagueTeamManagerApplicationDto[]> {
  const path = API_ROUTES.leagueTeamManagerApplications.mine

  return request<MyLeagueTeamManagerApplicationDto[]>(path, { signal })
}

/**
 * Returns the applications made for clubs in the signed-in caller's leagues.
 *
 * The backend decides which applications are listed and in what order.
 *
 * @param signal Aborts the request, normally from the calling hook's cleanup.
 * @returns The applications made for clubs in the caller's leagues.
 */
export function getIncomingLeagueTeamManagerApplications(
  signal?: AbortSignal,
): Promise<IncomingLeagueTeamManagerApplicationDto[]> {
  const path = API_ROUTES.leagueTeamManagerApplications.incoming

  return request<IncomingLeagueTeamManagerApplicationDto[]>(path, { signal })
}
