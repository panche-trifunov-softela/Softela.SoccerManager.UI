import { formatCreatedAt } from '@/utils/formatCreatedAt'

import { DOT_SEPARATOR, SEASON_LABEL } from '../constants'

import type { LeaguePlayerTransferBidDto } from '@/types/leaguePlayerTransferBidDto'

/**
 * Writes the line under a bid's club: the season, the day it was placed and who placed it.
 *
 * @param bid A bid as the API returns it.
 * @returns The season, the day and, when the bidding club has a manager, the manager's name, such
 * as `Season 1 · 9 Oct 2026 · Jane Doe`.
 */
export function toBidMeta(
  bid: Pick<LeaguePlayerTransferBidDto, 'seasonNumber' | 'createdAt' | 'managerName'>,
): string {
  const parts = [`${SEASON_LABEL} ${bid.seasonNumber}`, formatCreatedAt(bid.createdAt)]

  if (bid.managerName !== null) parts.push(bid.managerName)

  return parts.join(DOT_SEPARATOR)
}
