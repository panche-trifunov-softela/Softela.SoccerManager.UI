import { ageOn } from '@/utils/ageOn'
import { formatEuros } from '@/utils/formatEuros'

import { MORALE_LABELS } from '../constants'

import type { LeagueTeamSquadMemberDto } from '@/types/leagueTeamSquadMemberDto'

import type { SquadMemberRow } from '../types'

/**
 * Writes a squad member the API returned as a row the table can show.
 *
 * @param member The squad member, as the API returned them.
 * @param today The day the age is counted to.
 * @returns The row, with its texts already written for display.
 */
export function toSquadMemberRow(member: LeagueTeamSquadMemberDto, today: Date): SquadMemberRow {
  return {
    id: member.id,
    squadNumber: member.squadNumber,
    name: member.name,
    imageUrl: member.imageUrl,
    positionName: member.positionName,
    positionShortName: member.positionShortName,
    age: ageOn(member.dateOfBirth, today),
    nationality: member.nationalTeamName,
    nationalityLogoUrl: member.nationalTeamLogoUrl,
    value: formatEuros(member.value),
    wage: formatEuros(member.wage),
    morale: MORALE_LABELS[member.morale],
    condition: `${member.condition}%`,
    rating: member.rating,
  }
}
