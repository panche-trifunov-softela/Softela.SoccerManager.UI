import { useCallback, useMemo, useState } from 'react'

import { GAMEWORLDS } from './constants'

import type { GameworldSelectState } from './types'

/**
 * Owns which gameworld is currently selected.
 *
 * @returns The selected gameworld, the list to show, and a way to change it.
 */
export function useGameworldSelect(): GameworldSelectState {
  const [selectedId, setSelectedId] = useState(GAMEWORLDS[0].id)

  const selected = GAMEWORLDS.find((gameworld) => gameworld.id === selectedId) ?? GAMEWORLDS[0]
  const items = useMemo(() => GAMEWORLDS.map(({ id, name }) => ({ id, label: name })), [])
  const select = useCallback((id: string) => setSelectedId(id), [])

  return { selected, items, select }
}
