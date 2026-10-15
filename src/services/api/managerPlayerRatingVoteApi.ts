import { API_ROUTES } from './endpoints'
import { request } from './http'

import type { CreatedResourceDto } from '@/types/createdResourceDto'
import type { CreateManagerPlayerRatingVoteRequest } from '@/types/createManagerPlayerRatingVoteRequest'

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
