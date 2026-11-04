import { API_ROUTES } from './endpoints'
import { request } from './http'

import type { AutoPickMatchLineupRequest } from '@/types/autoPickMatchLineupRequest'
import type { InstructionDefinitionDto } from '@/types/instructionDefinitionDto'
import type { MatchInstructionsDto } from '@/types/matchInstructionsDto'
import type { MatchLineupDto } from '@/types/matchLineupDto'
import type { SaveMatchInstructionsRequest } from '@/types/saveMatchInstructionsRequest'
import type { SaveMatchLineupRequest } from '@/types/saveMatchLineupRequest'

/**
 * Reads the instructions a club gives for a match, each with its choices.
 *
 * @param signal Aborts the request, normally from the calling hook's cleanup.
 * @returns The instructions, in the order the API returns them.
 * @throws {ApiError} When the API answers with an error status.
 */
export function getInstructionOptions(signal?: AbortSignal): Promise<InstructionDefinitionDto[]> {
  return request<InstructionDefinitionDto[]>(API_ROUTES.matches.instructionOptions, { signal })
}

/**
 * Changes a club's lineup for a match: its formation, one slot, or both. A slot that is not named
 * is left as it is.
 *
 * @param lineup The match, the club, and the formation and the slot change to apply.
 * @returns The club's lineup after the change.
 * @throws {ApiError} When the API answers with an error status. A 400 carries its reasons in
 * `validationErrors`, a 403 means the caller may not change this lineup, and a 404 means the match
 * does not exist.
 */
export function saveMatchLineup(lineup: SaveMatchLineupRequest): Promise<MatchLineupDto> {
  return request<MatchLineupDto>(API_ROUTES.matches.lineup(lineup.matchId), {
    method: 'PUT',
    body: lineup,
  })
}

/**
 * Changes a club's instructions for a match; the ones not named keep their value.
 *
 * @param instructions The match, the club, and the instruction changes to apply.
 * @returns The club's instructions after the change.
 * @throws {ApiError} When the API answers with an error status. A 400 carries its reasons in
 * `validationErrors`, a 403 means the caller may not change these instructions, and a 404 means
 * the match does not exist.
 */
export function saveMatchInstructions(
  instructions: SaveMatchInstructionsRequest,
): Promise<MatchInstructionsDto> {
  return request<MatchInstructionsDto>(API_ROUTES.matches.instructions(instructions.matchId), {
    method: 'PUT',
    body: instructions,
  })
}

/**
 * Replaces a club's lineup for a match with one picked from its squad.
 *
 * @param pick The match, the club, and optionally the formation to pick for.
 * @returns The club's picked lineup.
 * @throws {ApiError} When the API answers with an error status. A 400 carries its reasons in
 * `validationErrors`, a 403 means the caller may not change this lineup, and a 404 means the match
 * does not exist.
 */
export function autoPickMatchLineup(pick: AutoPickMatchLineupRequest): Promise<MatchLineupDto> {
  return request<MatchLineupDto>(API_ROUTES.matches.autoPick(pick.matchId), {
    method: 'POST',
    body: pick,
  })
}
