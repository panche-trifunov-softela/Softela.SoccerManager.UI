import { MAIN_POSITION_SUFFIX, NO_POSITIONS_LABEL, POSITIONS_LABEL_PREFIX } from '../constants'

import type { PlayerProfilePositionDto } from '@/types/playerProfilePositionDto'

import type { PositionChip, PositionsPitchProps } from '../types'

/**
 * Works out what the positions pitch draws and says for a player's positions.
 *
 * - The pitch is drawn upright with the player's own goal at the bottom, so a position is placed at
 *   `pitchX` from the left and at `100 - pitchY` from the top. The x is never mirrored.
 * - A position with no place on the pitch, because no formation uses it, is left out of the chips
 *   but kept in the label.
 *
 * @param positions The player's positions, the main one first.
 * @returns The chips to draw and the drawing's accessible name, such as `Positions: CB (main), RB`.
 */
export function toPositionsPitch(
  positions: readonly PlayerProfilePositionDto[],
): PositionsPitchProps {
  const chips = positions.flatMap((position): PositionChip[] => {
    if (position.pitchX === null || position.pitchY === null) return []

    return [
      {
        positionId: position.positionId,
        shortName: position.shortName,
        isMain: position.isMain,
        left: `${position.pitchX}%`,
        top: `${100 - position.pitchY}%`,
      },
    ]
  })

  const names = positions.map(
    (position) => `${position.shortName}${position.isMain ? MAIN_POSITION_SUFFIX : ''}`,
  )

  return {
    chips,
    label: names.length === 0 ? NO_POSITIONS_LABEL : `${POSITIONS_LABEL_PREFIX}${names.join(', ')}`,
  }
}
