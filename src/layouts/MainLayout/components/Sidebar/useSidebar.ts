import { generatePath } from 'react-router'

import { useSelectedClub } from '@/hooks/useSelectedClub'

import { SIDEBAR_ITEMS } from './constants'

import type { SidebarState } from './types'

/**
 * Decides whether the sidebar shows and resolves its entries to the club in the
 * URL. The column is kept while the user's clubs load, so the page does not jump
 * once they arrive.
 *
 * @returns Whether the sidebar is visible and the entries to link.
 */
export function useSidebar(): SidebarState {
  const { club, isPending } = useSelectedClub()

  const isVisible = club !== null || isPending

  if (club === null) {
    return { isVisible, items: [] }
  }

  const items = SIDEBAR_ITEMS.map(({ label, route, icon }) => ({
    label,
    icon,
    to: generatePath(route, { leagueTeamId: String(club.leagueTeamId) }),
  }))

  return { isVisible, items }
}
