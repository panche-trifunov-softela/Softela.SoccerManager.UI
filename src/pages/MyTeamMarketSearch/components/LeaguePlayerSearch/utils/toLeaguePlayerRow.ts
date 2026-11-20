import { FREE_AGENT_LABEL } from '@/constants/freeAgent'
import { MISSING } from '@/constants/missing'
import { ageOn } from '@/utils/ageOn'
import { formatEuros } from '@/utils/formatEuros'

import type { PlayersInLeagueItemDto } from '@/types/playersInLeagueItemDto'

import type { LeaguePlayerRow } from '../types'

/**
 * Writes a player the API found as a row the table can show.
 *
 * @param item The player, as the API returned it.
 * @param today The day the age is counted to.
 * @returns The row, with its texts already written for display and the club "Free agent" when the
 * player is registered at none.
 */
export function toLeaguePlayerRow(item: PlayersInLeagueItemDto, today: Date): LeaguePlayerRow {
  return {
    id: item.playerId,
    name: item.name,
    imageUrl: item.imageUrl,
    positionName: item.positionName,
    positionShortName: item.positionShortName,
    age: ageOn(item.dateOfBirth, today),
    club: item.teamName ?? FREE_AGENT_LABEL,
    nationality: item.nationalTeamName ?? MISSING,
    rating: item.rating,
    value: formatEuros(item.value),
    wage: formatEuros(item.wage),
    isFreeAgent: item.leagueTeamId === null,
  }
}
