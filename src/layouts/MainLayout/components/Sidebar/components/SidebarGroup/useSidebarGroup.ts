import { useId, useRef, useState } from 'react'
import { matchPath, useLocation } from 'react-router'

import type { SidebarSubLinkItem } from '../../types'

import type { SidebarGroupState } from './types'

/**
 * Owns a sidebar group's open state.
 *
 * - The list starts open when the page is one of its links, so a deep link shows where the user
 *   is.
 * - Navigating to one of its links opens it; navigating anywhere else leaves it as it was, and
 *   nothing closes it but its toggle.
 * - The state is adjusted while rendering, as `useDrawer` does, not in an effect.
 * - Closing the list around the focused link first moves focus to the toggle, which would
 *   otherwise be lost to the page once the link is hidden.
 *
 * @param links The group's links, resolved to the club in the address.
 * @returns The open state, whether the page is one of the links, the list's id, the refs and
 * the toggle.
 */
export function useSidebarGroup(links: readonly SidebarSubLinkItem[]): SidebarGroupState {
  const { pathname } = useLocation()

  const isCurrent = links.some(({ to }) => matchPath(to, pathname) !== null)

  const [isOpen, setIsOpen] = useState(isCurrent)
  const [seenPathname, setSeenPathname] = useState(pathname)

  const listId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  if (seenPathname !== pathname) {
    setSeenPathname(pathname)

    if (isCurrent) setIsOpen(true)
  }

  const toggle = () => {
    if (isOpen && listRef.current?.contains(document.activeElement)) buttonRef.current?.focus()

    setIsOpen(!isOpen)
  }

  return { isOpen, isCurrent, listId, buttonRef, listRef, toggle }
}
