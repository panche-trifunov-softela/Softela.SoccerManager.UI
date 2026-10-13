import { MISSING } from '../constants'

import { ageOn } from './ageOn'
import { formatEuros } from './formatEuros'

import type { PlayerSearchItemDto } from '@/types/playerSearchItemDto'

import type { PlayerRow } from '../types'

/**
 * Writes a player the API found as a row the table can show.
 *
 * @param item The player, as the API returned it.
 * @param today The day the age is counted to.
 * @returns The row, with its texts already written for display.
 */
export function toPlayerRow(item: PlayerSearchItemDto, today: Date): PlayerRow {
  return {
    id: item.id,
    name: item.name,
    position: item.positionName ?? MISSING,
    age: ageOn(item.dateOfBirth, today),
    club: item.teamName ?? MISSING,
    nationality: item.nationalTeamName ?? MISSING,
    rating: item.rating,
    value: formatEuros(item.value),
    wage: formatEuros(item.wage),
  }
}
