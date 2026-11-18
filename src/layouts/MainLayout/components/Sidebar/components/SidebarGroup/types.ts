import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import type { RefObject } from 'react'

import type { SidebarSubLinkItem } from '../../types'

/** What `SidebarGroup` is handed. */
export interface SidebarGroupProps {
  /** The group's name, shown beside its icon. */
  label: string

  /** The group's icon. */
  icon: IconDefinition

  /** The links the group opens, already resolved to the club in the address. */
  links: readonly SidebarSubLinkItem[]
}

/** What `useSidebarGroup` hands the view. */
export interface SidebarGroupState {
  /** Whether the list of links shows. */
  isOpen: boolean

  /** Whether the page is one of the group's links. */
  isCurrent: boolean

  /** The id of the list of links, which the toggle controls. */
  listId: string

  /** The toggle, which receives focus when the list closes around the focused link. */
  buttonRef: RefObject<HTMLButtonElement | null>

  /** The list of links. */
  listRef: RefObject<HTMLUListElement | null>

  /** Opens the list when closed and closes it when open. */
  toggle: () => void
}
