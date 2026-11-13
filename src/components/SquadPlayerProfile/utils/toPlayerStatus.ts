import type { SquadPlayerProfileDto } from '@/types/squadPlayerProfileDto'

import type { PlayerStatusProps } from '../components/PlayerStatus'

/**
 * Writes a player's state in a club's league as the status section shows it.
 *
 * @param profile The player, as the API returned them.
 * @returns The section's props, with their texts already written.
 */
export function toPlayerStatus(profile: SquadPlayerProfileDto): PlayerStatusProps {
  return {
    condition: `${profile.condition}%`,
    morale: profile.moraleLabel,
    moraleLevel: profile.morale,
    concern: profile.moraleConcernLabel,
    isSuspended: profile.isSuspended,
  }
}
