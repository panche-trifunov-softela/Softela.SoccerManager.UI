import { useCallback, useMemo, useState } from 'react'

import { useMyLeagueTeams } from '@/hooks/useMyLeagueTeams'

import { LEAGUE_TEAM_LABEL_SEPARATOR } from './constants'

import type { LeagueSelectState } from './types'

/**
 * Owns which of the signed-in manager's league teams is selected, listing the ones the shared
 * my-teams store holds.
 *
 * - Until the user picks one, the first pair in the backend's order is selected.
 * - A selection that drops out of the list falls back to the first pair.
 *
 * @returns The selected pair, or `null` while there is none, the pairs to list, and a way to
 * change the selection.
 */
export function useLeagueSelect(): LeagueSelectState {
  const { teams } = useMyLeagueTeams()

  const [selectedId, setSelectedId] = useState<string | null>(null)

  const items = useMemo(
    () =>
      teams.map((team) => ({
        id: String(team.leagueTeamId),
        label: `${team.leagueName}${LEAGUE_TEAM_LABEL_SEPARATOR}${team.teamName}`,
      })),
    [teams],
  )

  const selected = items.find((item) => item.id === selectedId) ?? items[0] ?? null
  const select = useCallback((id: string) => setSelectedId(id), [])

  return { selected, items, select }
}
