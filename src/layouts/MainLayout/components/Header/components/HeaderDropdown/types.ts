import type { ReactNode, RefObject } from 'react'

/** One entry a `HeaderDropdown` lists. */
export interface HeaderDropdownItem {
  /** Identifies the entry when it is chosen. */
  id: string

  /** Text the entry shows. */
  label: string
}

/** Widget semantics a `HeaderDropdown` presents: a selection or a set of actions. */
export type HeaderDropdownRole = 'listbox' | 'menu'

/** Props of `HeaderDropdown`. */
export interface HeaderDropdownProps {
  /** What the trigger button shows. */
  trigger: ReactNode

  /** Accessible name for the trigger; required when `trigger` has no text. */
  ariaLabel?: string

  /** The entries, in display order. */
  items: readonly HeaderDropdownItem[]

  /** The entry marked as current; only meaningful for a `listbox`. */
  selectedId?: string

  /** `listbox` for a selection, `menu` for actions. */
  role: HeaderDropdownRole

  /**
   * Caption shown above the list when it renders as inline rows below the md
   * breakpoint; it also names the list for assistive technology.
   */
  heading?: string

  /**
   * Below the md breakpoint the list stays behind the trigger and expands
   * inline under it when pressed, instead of always showing its rows.
   */
  collapsible?: boolean

  /** Receives the chosen entry's id; the list closes afterwards. */
  onSelect: (id: string) => void
}

/** What `useHeaderDropdown` hands the view. */
export interface HeaderDropdownState {
  /** Whether the list is showing. */
  isOpen: boolean

  /** The element outside of which a pointer press closes the list. */
  containerRef: RefObject<HTMLDivElement | null>

  /** The trigger button, which gets focus back after a selection. */
  triggerRef: RefObject<HTMLButtonElement | null>

  /** Id of the heading element, which the list references as its label. */
  headingId: string

  /** Opens the list when closed and closes it when open. */
  toggle: () => void

  /** Reports the chosen entry and closes the list. */
  select: (id: string) => void
}
