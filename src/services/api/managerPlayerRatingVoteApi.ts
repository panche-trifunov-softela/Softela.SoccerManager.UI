import { API_ROUTES } from './endpoints'
import { request } from './http'

import type { CreatedResourceDto } from '@/types/createdResourceDto'
import type { CreateManagerPlayerRatingVoteRequest } from '@/types/createManagerPlayerRatingVoteRequest'
import type { SuccessResultDto } from '@/types/successResultDto'
import type { UpdateManagerPlayerRatingVoteRequest } from '@/types/updateManagerPlayerRatingVoteRequest'

/**
 * Votes, as the signed-in caller, on one player's current rating.
 *
 * @param vote The player, and which way the vote goes.
 * @returns The new vote's id.
 * @throws {ApiError} When the API answers with an error status. A 400 carries its reasons in
 * `validationErrors`.
 */
export function createManagerPlayerRatingVote(
  vote: CreateManagerPlayerRatingVoteRequest,
): Promise<CreatedResourceDto> {
  return request<CreatedResourceDto>(API_ROUTES.managerPlayerRatingVotes.create, {
    method: 'POST',
    body: vote,
  })
}

/**
 * Turns one of the signed-in caller's own votes around, up to down or down to up.
 *
 * @param vote The vote's id, and which way it goes now.
 * @returns The API's answer, which says the vote was updated.
 * @throws {ApiError} When the API answers with an error status. A 404 means the vote does not exist
 * or is not the caller's.
 */
export function updateManagerPlayerRatingVote(
  vote: UpdateManagerPlayerRatingVoteRequest,
): Promise<SuccessResultDto> {
  return request<SuccessResultDto>(API_ROUTES.managerPlayerRatingVotes.byId(vote.id), {
    method: 'PUT',
    body: vote,
  })
}

/**
 * Withdraws one of the signed-in caller's own votes.
 *
 * @param id The vote's id.
 * @returns The API's answer, which says the vote was deleted.
 * @throws {ApiError} When the API answers with an error status. A 404 means the vote does not exist
 * or is not the caller's.
 */
export function deleteManagerPlayerRatingVote(id: number): Promise<SuccessResultDto> {
  return request<SuccessResultDto>(API_ROUTES.managerPlayerRatingVotes.byId(id), {
    method: 'DELETE',
  })
}
