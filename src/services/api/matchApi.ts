import { API_ROUTES } from './endpoints'
import { request } from './http'
import { toQueryString } from './utils'

import type { AutoPickMatchLineupRequest } from '@/types/autoPickMatchLineupRequest'
import type { DeleteMatchSubstitutionRequest } from '@/types/deleteMatchSubstitutionRequest'
import type { InstructionDefinitionDto } from '@/types/instructionDefinitionDto'
import type { MatchInstructionsDto } from '@/types/matchInstructionsDto'
import type { MatchLineupDto } from '@/types/matchLineupDto'
import type { MatchSubstitutionDto } from '@/types/matchSubstitutionDto'
import type { SaveMatchInstructionsRequest } from '@/types/saveMatchInstructionsRequest'
import type { SaveMatchInstructionsSubstitutionRequest } from '@/types/saveMatchInstructionsSubstitutionRequest'
import type { SaveMatchLineupRequest } from '@/types/saveMatchLineupRequest'
import type { SaveMatchLineupSubstitutionRequest } from '@/types/saveMatchLineupSubstitutionRequest'
import type { SubstitutionField } from '@/types/substitutionField'

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

/**
 * Reads the minutes and the situations a club picks a substitution by, each with its choices.
 *
 * @param signal Aborts the request, normally from the calling hook's cleanup.
 * @returns The minute's and the situation's choices, in the order the API returns them.
 * @throws {ApiError} When the API answers with an error status.
 */
export function getSubstitutionOptions(
  signal?: AbortSignal,
): Promise<InstructionDefinitionDto<SubstitutionField>[]> {
  return request<InstructionDefinitionDto<SubstitutionField>[]>(
    API_ROUTES.matches.substitutionOptions,
    { signal },
  )
}

/**
 * Reads a club's saved substitutions for a match.
 *
 * @param matchId The match's id.
 * @param leagueTeamId The league team's id.
 * @param signal Aborts the request, normally from the calling hook's cleanup.
 * @returns The club's saved substitutions for the match, ordered by minute then situation; empty
 * when it has none.
 * @throws {ApiError} When the API answers with an error status, such as 403 for a caller who does
 * not manage the club.
 */
export function getMatchSubstitutions(
  matchId: number,
  leagueTeamId: number,
  signal?: AbortSignal,
): Promise<MatchSubstitutionDto[]> {
  const path = API_ROUTES.matches.substitutions(matchId) + toQueryString({ leagueTeamId })

  return request<MatchSubstitutionDto[]>(path, { signal })
}

/**
 * Changes a club's substitution lineup for a match at a minute and situation: its formation, one
 * slot, or both. The first change creates the substitution from the main lineup.
 *
 * @param lineup The match, the club, the minute and situation, and the formation and the slot
 * change to apply.
 * @returns Every saved substitution of the club for the match after the change.
 * @throws {ApiError} When the API answers with an error status. A 400 carries its reasons in
 * `validationErrors`, a 403 means the caller may not change this substitution, and a 404 means the
 * match does not exist.
 */
export function saveMatchLineupSubstitution(
  lineup: SaveMatchLineupSubstitutionRequest,
): Promise<MatchSubstitutionDto[]> {
  return request<MatchSubstitutionDto[]>(API_ROUTES.matches.substitutionLineup(lineup.matchId), {
    method: 'PUT',
    body: lineup,
  })
}

/**
 * Changes a club's instructions in its substitution for a match at a minute and situation; the
 * ones not named keep their value. The first change creates the substitution from the main
 * lineup.
 *
 * @param instructions The match, the club, the minute and situation, and the instruction changes
 * to apply.
 * @returns Every saved substitution of the club for the match after the change.
 * @throws {ApiError} When the API answers with an error status. A 400 carries its reasons in
 * `validationErrors`, a 403 means the caller may not change this substitution, and a 404 means the
 * match does not exist.
 */
export function saveMatchInstructionsSubstitution(
  instructions: SaveMatchInstructionsSubstitutionRequest,
): Promise<MatchSubstitutionDto[]> {
  return request<MatchSubstitutionDto[]>(
    API_ROUTES.matches.substitutionInstructions(instructions.matchId),
    { method: 'PUT', body: instructions },
  )
}

/**
 * Deletes a club's substitution for a match at a minute and situation. Deleting one that does not
 * exist is not an error.
 *
 * @param substitution The match, the club, and the minute and situation of the substitution.
 * @returns The club's substitutions for the match that are left; empty when none is.
 * @throws {ApiError} When the API answers with an error status. A 400 carries its reasons in
 * `validationErrors`, a 403 means the caller may not change this substitution, and a 404 means the
 * match does not exist.
 */
export function deleteMatchSubstitution(
  substitution: DeleteMatchSubstitutionRequest,
): Promise<MatchSubstitutionDto[]> {
  const { matchId, leagueTeamId, minuteAt, situation } = substitution

  const path =
    API_ROUTES.matches.substitutions(matchId) +
    toQueryString({ leagueTeamId, minuteAt, situation })

  return request<MatchSubstitutionDto[]>(path, { method: 'DELETE' })
}
