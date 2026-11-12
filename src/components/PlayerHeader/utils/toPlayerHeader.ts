import { formatEuros } from '@/utils/formatEuros'

import { toBirthText } from './toBirthText'
import { toPositionText } from './toPositionText'

import type { PlayerProfileDto } from '@/types/playerProfileDto'

import type { PlayerHeaderProps } from '../types'

/**
 * Writes a player's record from the players table as the header shows it.
 *
 * @param profile The player, as the API returned them.
 * @param today The day the age is counted to.
 * @returns The header's props, with their texts already written. The club is the player's
 * real-life club, and there is no contract or squad number.
 */
export function toPlayerHeader(profile: PlayerProfileDto, today: Date): PlayerHeaderProps {
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
    contract: null,
    squadNumber: null,
  }
}
