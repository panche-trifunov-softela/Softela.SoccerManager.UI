import { generatePath, useNavigate } from 'react-router'

import { ROUTES } from '@/constants/routes'
import { useMyLeagueTeams } from '@/hooks/useMyLeagueTeams'
import { useSelectedClub } from '@/hooks/useSelectedClub'

import { LEAGUE_TEAM_LABEL_SEPARATOR } from './constants'

import type { LeagueSelectState } from './types'

/**
 * Drives the club switcher: lists the league teams the shared my-teams store holds, marks the
 * one the URL names, and opens another club's squad page when the user picks it.
 *
 * - The selected club is the one in the URL, never a locally remembered choice.
 * - Picking the selected club does nothing.
 * - Picking another club always opens its squad page, whichever page is open now.
 *
 * @returns The selected pair or `null`, the pairs to list, and a way to switch clubs.
 */
export function useLeagueSelect(): LeagueSelectState {
  const { teams } = useMyLeagueTeams()
  const { club } = useSelectedClub()
  const navigate = useNavigate()

  const items = teams.map((team) => ({
    id: String(team.leagueTeamId),
    label: `${team.leagueName}${LEAGUE_TEAM_LABEL_SEPARATOR}${team.teamName}`,
  }))

  const selectedId = club === null ? null : String(club.leagueTeamId)
  const selected = items.find((item) => item.id === selectedId) ?? null

  const select = (id: string) => {
    if (id === selectedId) return

    void navigate(generatePath(ROUTES.myTeamSquad, { leagueTeamId: id }))
  }

  return { selected, items, select }
}
