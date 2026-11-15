import { generatePath } from 'react-router'

import { useDrawer } from '@/hooks/useDrawer'
import { useSelectedClub } from '@/hooks/useSelectedClub'

import { SIDEBAR_ITEMS } from './constants'

import type { SidebarState } from './types'

/**
 * Decides whether the sidebar shows, resolves its entries to the club in the URL
 * and wires its drawer to the shared drawer behaviour. The column is kept while
 * the user's clubs load, so the page does not jump once they arrive.
 *
 * @returns Whether the sidebar is visible, the entries to link, and the drawer's
 * state, refs and handlers.
 */
export function useSidebar(): SidebarState {
  const { club, isPending } = useSelectedClub()

  const isVisible = club !== null || isPending

  const items =
    club === null
      ? []
      : SIDEBAR_ITEMS.map(({ label, route, icon }) => ({
          label,
          icon,
          to: generatePath(route, { leagueTeamId: String(club.leagueTeamId) }),
        }))

  const { isOpen, id, toggleRef, panelRef, toggle, close } = useDrawer({ isEnabled: items.length > 0 })

  return { isVisible, items, isOpen, navId: id, toggleRef, rootRef: panelRef, toggle, close }
}
