import { useRef } from 'react'

import { useAuth } from '@/hooks/useAuth'
import { useDrawer } from '@/hooks/useDrawer'
import { useActingClub } from '@/hooks/useActingClub'

import type { HeaderState } from './types'

/**
 * Reads the signed-in user and the club the manager acts as on the page, exposes a sign-out
 * action, and wires the slide-in menu to the shared drawer behaviour, focusing its close button on
 * open.
 *
 * @returns The user data, the acting club's id, the menu's state, refs and handlers.
 */
export function useHeader(): HeaderState {
  const { user, logout } = useAuth()
  const { actingClubId } = useActingClub()

  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const { isOpen, id, toggleRef, panelRef, toggle, close } = useDrawer({ initialFocusRef: closeButtonRef })

  const signOut = () => {
    void logout()
  }

  return {
    username: user?.username ?? '',
    actingClubId,
    signOut,
    isMenuOpen: isOpen,
    menuId: id,
    toggleRef,
    menuRef: panelRef,
    closeButtonRef,
    toggleMenu: toggle,
    closeMenu: close,
  }
}
