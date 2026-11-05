import { FIT_GOOD_MIN_QUALITY, FIT_OK_MIN_QUALITY } from '../constants'

import type { MatchLineupSlotDto } from '@/types/matchLineupSlotDto'

import type { PositionFit } from '../types'

/**
 * Says how well the player in a slot suits the position the slot asks for.
 *
 * - A bench slot asks for no position and an empty slot has no player, so neither has a fit. The
 *   same goes for a slot missing its played position or its quality.
 * - A player with no rating for the slot's position is a poor fit whatever the quality says,
 *   because the API saves such a player with their main position's rating, normally 100.
 * - Otherwise the quality decides.
 *
 * @param slot The slot, as the API returned it.
 * @returns The fit, or `null` when the slot has none.
 */
export function toPositionFit(slot: MatchLineupSlotDto): PositionFit | null {
  const { positionId, playerId, playedPositionId, qualityAtPositionOnMatch: quality } = slot

  if (positionId === null || playerId === null || playedPositionId === null || quality === null) {
    return null
  }

  if (playedPositionId !== positionId) return 'poor'

  if (quality >= FIT_GOOD_MIN_QUALITY) return 'good'

  return quality >= FIT_OK_MIN_QUALITY ? 'ok' : 'poor'
}
