import type { SquadPlayerProfileDto } from '@/types/squadPlayerProfileDto'

import type { BidsTarget } from '../types'

/**
 * Works out the player a bid can be placed for.
 *
 * @param profile The player, as the API returned them.
 * @param leagueTeamId The selected club's league team id.
 * @returns The player's name, value and wage, or `null` when the player is registered at the
 * selected club itself, whose own player cannot be bid on.
 */
export function toBidsTarget(
  profile: SquadPlayerProfileDto,
  leagueTeamId: number,
): BidsTarget | null {
  if (profile.leagueTeamId === leagueTeamId) return null

  return { playerName: profile.name, value: profile.value, wage: profile.wage }
}
