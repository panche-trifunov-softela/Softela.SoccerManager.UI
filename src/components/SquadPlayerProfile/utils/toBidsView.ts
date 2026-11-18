import type { SquadPlayerProfileDto } from '@/types/squadPlayerProfileDto'

import type { BidsView } from '../types'

/**
 * Works out what the Bids tab shows for a player.
 *
 * @param profile The player, as the API returned them.
 * @param leagueTeamId The acting club's league team id.
 * @returns For a player registered at the acting club itself, the view that answers the bids
 * received for them; for any other player, the view that places a bid for them, with their name,
 * value and wage.
 */
export function toBidsView(profile: SquadPlayerProfileDto, leagueTeamId: number): BidsView {
  if (profile.leagueTeamId === leagueTeamId) return { kind: 'answer' }

  return {
    kind: 'place',
    target: { playerName: profile.name, value: profile.value, wage: profile.wage },
  }
}
