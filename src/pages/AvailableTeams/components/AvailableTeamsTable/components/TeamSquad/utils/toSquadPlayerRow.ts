import type { LeagueTeamSquadPlayerDto } from '@/types/leagueTeamSquadPlayerDto'

import type { SquadPlayerRow } from '../types'

/**
 * Writes a squad member the API returned as a row the table can show.
 *
 * @param player The player, as the API returned them.
 * @returns The row the table shows.
 */
export function toSquadPlayerRow(player: LeagueTeamSquadPlayerDto): SquadPlayerRow {
  return {
    id: player.id,
    name: player.name,
    imageUrl: player.imageUrl,
    positionName: player.positionName,
    positionShortName: player.positionShortName,
    rating: player.rating,
  }
}
