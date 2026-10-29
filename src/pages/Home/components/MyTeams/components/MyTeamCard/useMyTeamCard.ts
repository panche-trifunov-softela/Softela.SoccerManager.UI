import { useMemo } from 'react'
import { generatePath } from 'react-router'

import { ROUTES } from '@/constants/routes'

import { formatTenure } from './utils'

import type { MyTeamCardProps, MyTeamCardState } from './types'

/**
 * Derives what the card shows from the team it was handed.
 *
 * @param team The team the card describes.
 * @returns The tenure span and the path to the team's squad.
 */
export function useMyTeamCard(team: MyTeamCardProps['team']): MyTeamCardState {
  const tenure = useMemo(
    () => formatTenure(team.startDate, team.endDate),
    [team.startDate, team.endDate],
  )

  const squadPath = useMemo(
    () => generatePath(ROUTES.myTeamSquad, { leagueTeamId: String(team.leagueTeamId) }),
    [team.leagueTeamId],
  )

  return { tenure, squadPath }
}
