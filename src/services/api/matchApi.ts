import { API_ROUTES } from './endpoints'
import { request } from './http'

import type { AutoPickMatchLineupRequest } from '@/types/autoPickMatchLineupRequest'
import type { MatchLineupDto } from '@/types/matchLineupDto'
import type { SaveMatchLineupRequest } from '@/types/saveMatchLineupRequest'

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
