import { MISSING } from '../constants'

import type { LeagueTeamSquadPlayerDto } from '@/types/leagueTeamSquadPlayerDto'

import type { SquadPlayerRow } from '../types'

/**
 * Writes a squad member the API returned as a row the table can show. A blank photo address
 * counts as none.
 *
 * @param player The player, as the API returned them.
 * @returns The row, with its position already written for display.
 */
export function toSquadPlayerRow(player: LeagueTeamSquadPlayerDto): SquadPlayerRow {
  return {
    id: player.id,
    name: player.name,
    imageUrl: player.imageUrl?.trim() ? player.imageUrl : null,
    position: player.positionName ?? MISSING,
    rating: player.rating,
  }
}
