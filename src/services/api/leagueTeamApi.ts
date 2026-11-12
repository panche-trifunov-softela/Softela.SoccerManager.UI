import { API_ROUTES } from './endpoints'
import { request } from './http'
import { toQueryString } from './utils'

import type { AvailableLeagueTeamDto } from '@/types/availableLeagueTeamDto'
import type { LeagueTeamSquadMemberDto } from '@/types/leagueTeamSquadMemberDto'
import type { LeagueTeamSquadPlayerDto } from '@/types/leagueTeamSquadPlayerDto'
import type { NextMatchDto } from '@/types/nextMatchDto'
import type { SquadPlayerProfileDto } from '@/types/squadPlayerProfileDto'

/**
 * Reads every club on one league's roster, with whether each has a current manager and whether
 * the signed-in caller has applied for it.
 *
 * @param leagueId The league's id.
 * @param signal Aborts the request, normally from the calling hook's cleanup.
 * @returns The clubs, in the order the API returns them.
 * @throws {ApiError} When the API answers with an error status.
 */
export function getAvailableLeagueTeams(
  leagueId: number,
  signal?: AbortSignal,
): Promise<AvailableLeagueTeamDto[]> {
  const path = API_ROUTES.leagueTeams.available + toQueryString({ leagueId })

  return request<AvailableLeagueTeamDto[]>(path, { signal })
}

/**
 * Reads one league team's squad, each player with their current rating and main position.
 *
 * @param leagueTeamId The league team's id.
 * @param signal Aborts the request, normally from the calling hook's cleanup.
 * @returns The players, in the order the API returns them.
 * @throws {ApiError} When the API answers with an error status.
 */
export function getLeagueTeamSquad(
  leagueTeamId: number,
  signal?: AbortSignal,
): Promise<LeagueTeamSquadPlayerDto[]> {
  const path = API_ROUTES.leagueTeams.players(leagueTeamId)

  return request<LeagueTeamSquadPlayerDto[]>(path, { signal })
}

/**
 * Reads one league team's squad as its manager sees it: each player's contract, morale and
 * condition in that game world, with their current rating, main position and national team.
 *
 * @param leagueTeamId The league team's id.
 * @param signal Aborts the request, normally from the calling hook's cleanup.
 * @returns The players, in the order the API returns them.
 * @throws {ApiError} When the API answers with an error status, such as 403 for a caller who
 * does not manage the club.
 */
export function getLeagueTeamSquadMembers(
  leagueTeamId: number,
  signal?: AbortSignal,
): Promise<LeagueTeamSquadMemberDto[]> {
  const path = API_ROUTES.leagueTeams.squad(leagueTeamId)

  return request<LeagueTeamSquadMemberDto[]>(path, { signal })
}

/**
 * Reads one league team's next match, with the club's lineup for it.
 *
 * @param leagueTeamId The league team's id.
 * @param signal Aborts the request, normally from the calling hook's cleanup.
 * @returns The next match, or `null` when the club has no match to come: the API answers 204 with
 * no body, which `request` resolves as `undefined`.
 * @throws {ApiError} When the API answers with an error status, such as 403 for a caller who
 * does not manage the club.
 */
export async function getLeagueTeamNextMatch(
  leagueTeamId: number,
  signal?: AbortSignal,
): Promise<NextMatchDto | null> {
  const path = API_ROUTES.leagueTeams.nextMatch(leagueTeamId)

  const nextMatch = await request<NextMatchDto | undefined>(path, { signal })

  return nextMatch ?? null
}

/**
 * Reads one player as a club's game world has them: the club's own registration, or else one at
 * another club of the same league, with the contract, morale, condition and suspension there.
 *
 * @param leagueTeamId The selected club's league team id.
 * @param playerId The player's id.
 * @param signal Aborts the request, normally from the calling hook's cleanup.
 * @returns The player's profile in that game world.
 * @throws {ApiError} When the API answers with an error status: 403 for a caller who does not
 * manage the club, or 404 for a player with no registration in the club's league.
 */
export function getGameWorldPlayerProfile(
  leagueTeamId: number,
  playerId: number,
  signal?: AbortSignal,
): Promise<SquadPlayerProfileDto> {
  const path = API_ROUTES.leagueTeams.gameWorldPlayer(leagueTeamId, playerId)

  return request<SquadPlayerProfileDto>(path, { signal })
}
