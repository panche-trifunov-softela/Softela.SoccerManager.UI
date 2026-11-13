import { useId, useRef, useState } from 'react'

import { toNextTabIndex } from './utils'

import type { KeyboardEvent } from 'react'

import type { TabItem, TabsState } from './types'

/**
 * Keeps which tab is selected, which tabs were selected at least once, and the tab buttons the
 * keyboard moves the focus between.
 *
 * - The first tab starts selected, and so counts as visited.
 * - A tab becomes visited when it is selected, in the handler that selects it, and stays so.
 * - ArrowRight and ArrowLeft move to the next and the previous tab, wrapping, and Home and End to
 *   the first and the last. The tab moved to is selected and focused. Any other key is left alone.
 *
 * @param tabs The tabs, in order; at least one.
 * @returns The ids' base, the selection, the visited tabs and the handlers the view wires up.
 */
export function useTabs(tabs: TabItem[]): TabsState {
  const baseId = useId()

  const [selectedId, setSelectedId] = useState(tabs[0].id)

  const [visitedIds, setVisitedIds] = useState([tabs[0].id])

  const tabElements = useRef(new Map<string, HTMLButtonElement>())

  const select = (id: string) => {
    setSelectedId(id)

    setVisitedIds((visited) => (visited.includes(id) ? visited : [...visited, id]))
  }

  const setTabElement = (id: string, element: HTMLButtonElement | null) => {
    if (element === null) {
      tabElements.current.delete(id)

      return
    }

    tabElements.current.set(id, element)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const nextIndex = toNextTabIndex(event.key, index, tabs.length)

    if (nextIndex === null) return

    event.preventDefault()

    const nextId = tabs[nextIndex].id

    select(nextId)

    tabElements.current.get(nextId)?.focus()
  }

  return { baseId, selectedId, visitedIds, select, setTabElement, onKeyDown }
}
