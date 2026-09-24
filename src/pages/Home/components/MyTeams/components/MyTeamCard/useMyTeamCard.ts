import { useMemo } from 'react'

import { accentForLeague, formatTenure } from './utils'

import type { MyTeamCardProps, MyTeamCardState } from './types'

/**
 * Derives what the card shows from the team it was handed.
 *
 * @param team The team the card describes.
 * @returns The accent colour and the tenure span.
 */
export function useMyTeamCard(team: MyTeamCardProps['team']): MyTeamCardState {
  const accent = useMemo(() => accentForLeague(team.leagueId), [team.leagueId])

  const tenure = useMemo(
    () => formatTenure(team.startDate, team.endDate),
    [team.startDate, team.endDate],
  )

  return { accent, tenure }
}
