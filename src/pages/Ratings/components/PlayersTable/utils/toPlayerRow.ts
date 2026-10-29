import { MISSING } from '@/constants/missing'
import { ageOn } from '@/utils/ageOn'
import { formatEuros } from '@/utils/formatEuros'

import { toVoteDirection } from './toVoteDirection'

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
    imageUrl: item.imageUrl,
    positionName: item.positionName,
    positionShortName: item.positionShortName,
    age: ageOn(item.dateOfBirth, today),
    club: item.teamName ?? MISSING,
    nationality: item.nationalTeamName ?? MISSING,
    rating: item.rating,
    value: formatEuros(item.value),
    wage: formatEuros(item.wage),
    myVote: toVoteDirection(item.myVote),
    // An API build from before the field existed sends none, which counts as no vote id.
    myVoteId: item.myVoteId ?? null,
  }
}
