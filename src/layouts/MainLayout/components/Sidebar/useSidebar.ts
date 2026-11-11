import { useId, useState } from 'react'
import { generatePath } from 'react-router'

import { useSelectedClub } from '@/hooks/useSelectedClub'

import { SIDEBAR_ITEMS } from './constants'
import { readCollapsed, writeCollapsed } from './utils'

import type { SidebarState } from './types'

/**
 * Decides whether the sidebar shows, resolves its entries to the club in the URL
 * and keeps the phone collapse choice. The column is kept while the user's clubs
 * load, so the page does not jump once they arrive.
 *
 * @returns Whether the sidebar is visible, the entries to link, and the collapse
 * state with its toggle.
 */
export function useSidebar(): SidebarState {
  const { club, isPending } = useSelectedClub()
  const [isCollapsed, setIsCollapsed] = useState(readCollapsed)
  const navId = useId()

  const isVisible = club !== null || isPending

  const toggleCollapsed = () => {
    const next = !isCollapsed

    setIsCollapsed(next)
    writeCollapsed(next)
  }

  if (club === null) {
    return { isVisible, items: [], isCollapsed, navId, toggleCollapsed }
  }

  const items = SIDEBAR_ITEMS.map(({ label, route, icon }) => ({
    label,
    icon,
    to: generatePath(route, { leagueTeamId: String(club.leagueTeamId) }),
  }))

  return { isVisible, items, isCollapsed, navId, toggleCollapsed }
}
