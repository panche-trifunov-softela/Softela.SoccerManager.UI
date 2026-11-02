import type { MatchLineupDto } from '@/types/matchLineupDto'

import type { LineupIndex } from '../types'

/**
 * Finds a lineup's players from either side: by the slot they are in, and by who they are.
 *
 * @param lineup The lineup, as the API returned it.
 * @returns The player in each filled slot and the slot of each lineup player. An empty slot is in
 * neither.
 */
export function toLineupIndex(lineup: MatchLineupDto): LineupIndex {
  const playerBySlot = new Map<number, number>()

  const slotByPlayer = new Map<number, number>()

  for (const { slotNumber, playerId } of lineup.slots) {
    if (playerId === null) continue

    playerBySlot.set(slotNumber, playerId)

    slotByPlayer.set(playerId, slotNumber)
  }

  return { playerBySlot, slotByPlayer }
}
