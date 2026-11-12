import { formatEuros } from '@/utils/formatEuros'

import { toBirthText } from './toBirthText'
import { toContractText } from './toContractText'
import { toPositionText } from './toPositionText'

import type { SquadPlayerProfileDto } from '@/types/squadPlayerProfileDto'

import type { PlayerHeaderProps } from '../types'

/**
 * Writes a player's registration in a club's game world as the header shows it.
 *
 * @param profile The player, as the API returned them.
 * @param today The day the age is counted to.
 * @returns The header's props, with their texts already written. The club is the one the player is
 * registered at, and the contract and squad number are that registration's.
 */
export function toSquadPlayerHeader(
  profile: SquadPlayerProfileDto,
  today: Date,
): PlayerHeaderProps {
  return {
    imageUrl: profile.imageUrl,
    clubName: profile.teamName,
    clubLogoUrl: profile.teamLogoUrl,
    nationality: profile.nationalTeamName,
    nationalityLogoUrl: profile.nationalTeamLogoUrl,
    birth: toBirthText(profile.dateOfBirth, today),
    position: toPositionText(profile.positionName, profile.positionShortName),
    rating: profile.rating,
    value: formatEuros(profile.value),
    wage: formatEuros(profile.wage),
    contract: toContractText(profile.contractLength),
    squadNumber: profile.squadNumber,
  }
}
