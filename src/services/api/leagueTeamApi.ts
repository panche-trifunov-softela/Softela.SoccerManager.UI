import { API_ROUTES } from './endpoints'
import { request } from './http'
import { toQueryString } from './utils'

import type { AvailableLeagueTeamDto } from '@/types/availableLeagueTeamDto'
import type { CreatedResourceDto } from '@/types/createdResourceDto'
import type { LeagueSearchResultDto } from '@/types/leagueSearchResultDto'
import type { LeagueTeamProfileDto } from '@/types/leagueTeamProfileDto'
import type { LeagueTeamSquadMemberDto } from '@/types/leagueTeamSquadMemberDto'
import type { LeagueTeamSquadPlayerDto } from '@/types/leagueTeamSquadPlayerDto'
import type { NextMatchDto } from '@/types/nextMatchDto'
import type { PlaceLoanBidRequest } from '@/types/placeLoanBidRequest'
import type { PlaceTransferBidRequest } from '@/types/placeTransferBidRequest'
import type { PlayerInjuryDto } from '@/types/playerInjuryDto'
import type { PlayerTransferDto } from '@/types/playerTransferDto'
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
 * Reads one league team's names and its league, the same for every signed-in caller.
 *
 * @param leagueTeamId The league team's id.
 * @param signal Aborts the request, normally from the calling hook's cleanup.
 * @returns The club's profile.
 * @throws {ApiError} When the API answers with an error status, such as 404 for an unknown club.
 */
export function getLeagueTeamProfile(
  leagueTeamId: number,
  signal?: AbortSignal,
): Promise<LeagueTeamProfileDto> {
  const path = API_ROUTES.leagueTeams.profile(leagueTeamId)

  return request<LeagueTeamProfileDto>(path, { signal })
}

/**
 * Reads one league team's squad as its manager sees it: each player's contract, morale and
 * condition in that game world, with their current rating, main position and national team.
 *
 * @param leagueTeamId The league team's id.
 * @param signal Aborts the request, normally from the calling hook's cleanup.
 * @returns The players, in the order the API returns them.
 * @throws {ApiError} When the API answers with an error status, such as 403 for a caller who
 * manages neither the club nor another club in its league.
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
 * Reads one player as a club's league has them: the club's own registration, or else one at
 * another club of the same league, with the contract, morale, condition and suspension there.
 *
 * @param leagueTeamId The acting club's league team id.
 * @param playerId The player's id.
 * @param signal Aborts the request, normally from the calling hook's cleanup.
 * @returns The player's profile in that league.
 * @throws {ApiError} When the API answers with an error status: 403 for a caller who does not
 * manage the club, or 404 for a player with no registration in the club's league.
 */
export function getLeaguePlayerProfile(
  leagueTeamId: number,
  playerId: number,
  signal?: AbortSignal,
): Promise<SquadPlayerProfileDto> {
  const path = API_ROUTES.leagueTeams.leaguePlayer(leagueTeamId, playerId)

  return request<SquadPlayerProfileDto>(path, { signal })
}

/**
 * Reads one player's transfers into the clubs of a club's league, newest first.
 *
 * @param leagueTeamId The acting club's league team id.
 * @param playerId The player's id.
 * @param signal Aborts the request, normally from the calling hook's cleanup.
 * @returns The transfers, newest first; an empty list when the player has none.
 * @throws {ApiError} When the API answers with an error status: 403 for a caller who does not
 * manage the club, or 404 for a player with no registration in the club's league.
 */
export function getLeaguePlayerTransfers(
  leagueTeamId: number,
  playerId: number,
  signal?: AbortSignal,
): Promise<PlayerTransferDto[]> {
  const path = API_ROUTES.leagueTeams.leaguePlayerTransfers(leagueTeamId, playerId)

  return request<PlayerTransferDto[]>(path, { signal })
}

/**
 * Reads one player's injuries in a club's league, newest first.
 *
 * @param leagueTeamId The acting club's league team id.
 * @param playerId The player's id.
 * @param signal Aborts the request, normally from the calling hook's cleanup.
 * @returns The injuries, newest first; an empty list when the player has none.
 * @throws {ApiError} When the API answers with an error status: 403 for a caller who does not
 * manage the club, or 404 for a player with no registration in the club's league.
 */
export function getLeaguePlayerInjuries(
  leagueTeamId: number,
  playerId: number,
  signal?: AbortSignal,
): Promise<PlayerInjuryDto[]> {
  const path = API_ROUTES.leagueTeams.leaguePlayerInjuries(leagueTeamId, playerId)

  return request<PlayerInjuryDto[]>(path, { signal })
}

/**
 * Searches a club's league by name for players, registered or free agents, and for clubs, ignoring
 * case and accents. A name matches when it contains the term, and names that start with the term,
 * or a word of it, come first.
 *
 * @param leagueTeamId The acting club's league team id.
 * @param searchTerm The text to look for in the names, at least two characters once trimmed.
 * @param signal Aborts the request, normally from the calling hook's cleanup.
 * @returns The best five players, each with the club the player is registered at if any, the best
 * five clubs, and for each group how many matched in all.
 * @throws {ApiError} When the API answers with an error status: 400 for a term that is too short
 * or too long, or 403 for a caller who does not manage the club.
 */
export function searchLeague(
  leagueTeamId: number,
  searchTerm: string,
  signal?: AbortSignal,
): Promise<LeagueSearchResultDto> {
  const path = API_ROUTES.leagueTeams.search(leagueTeamId) + toQueryString({ searchTerm })

  return request<LeagueSearchResultDto>(path, { signal })
}

/**
 * Places, as the signed-in caller, a transfer bid for a player registered at another club of the
 * league. The bidding club is the route's club.
 *
 * @param leagueTeamId The bidding club's league team id.
 * @param playerId The player's id.
 * @param bid The fee offered, the optional buyback and the squad players offered in swap.
 * @returns The new bid's id.
 * @throws {ApiError} When the API answers with an error status. A 400 carries its reasons in
 * `validationErrors`.
 */
export function placeTransferBid(
  leagueTeamId: number,
  playerId: number,
  bid: PlaceTransferBidRequest,
): Promise<CreatedResourceDto> {
  const path = API_ROUTES.leagueTeams.leaguePlayerTransferBids(leagueTeamId, playerId)

  return request<CreatedResourceDto>(path, { method: 'POST', body: bid })
}

/**
 * Places, as the signed-in caller, a loan bid for a player registered at another club of the
 * league. The bidding club is the route's club.
 *
 * @param leagueTeamId The bidding club's league team id.
 * @param playerId The player's id.
 * @param bid The fee offered, the loan's length and the optional buy option.
 * @returns The new bid's id.
 * @throws {ApiError} When the API answers with an error status. A 400 carries its reasons in
 * `validationErrors`.
 */
export function placeLoanBid(
  leagueTeamId: number,
  playerId: number,
  bid: PlaceLoanBidRequest,
): Promise<CreatedResourceDto> {
  const path = API_ROUTES.leagueTeams.leaguePlayerLoanBids(leagueTeamId, playerId)

  return request<CreatedResourceDto>(path, { method: 'POST', body: bid })
}
