import { useCallback, useMemo, useState } from 'react'

import { LEAGUES } from './constants'

import type { LeagueSelectState } from './types'

/**
 * Owns which league is currently selected.
 *
 * @returns The selected league, the list to show, and a way to change it.
 */
export function useLeagueSelect(): LeagueSelectState {
  const [selectedId, setSelectedId] = useState(LEAGUES[0].id)

  const selected = LEAGUES.find((league) => league.id === selectedId) ?? LEAGUES[0]
  const items = useMemo(() => LEAGUES.map(({ id, name }) => ({ id, label: name })), [])
  const select = useCallback((id: string) => setSelectedId(id), [])

  return { selected, items, select }
}
