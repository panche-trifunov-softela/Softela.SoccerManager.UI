import type { KeyboardEvent, ReactNode } from 'react'

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

/** One tab: its button's label, optionally an icon, and the panel it shows. */
export interface TabItem {
  /** What tells the tab from the others; unique among the tabs, and part of the elements' ids. */
  id: string

  /** The words on the tab's button, which name it even where only its icon shows. */
  label: string

  /**
   * The icon that stands for the label on a narrow screen, or `undefined` for a tab that always
   * shows its words. The `segmented` variant never shows it.
   */
  icon?: IconDefinition

  /** What the tab shows, rendered once the tab was first selected. */
  panel: ReactNode
}

/**
 * How the tab strip looks: `line` is plain text tabs over a line, `segmented` is a strip of small
 * buttons side by side, the selected one filled.
 */
export type TabsVariant = 'line' | 'segmented'

/** What `Tabs` is handed. */
export interface TabsProps {
  /** The accessible name of the tab strip. */
  label: string

  /** The tabs, in order; at least one. */
  tabs: TabItem[]

  /** How the tab strip looks; `line` when omitted. */
  variant?: TabsVariant
}

/** What `useTabs` exposes to the view. */
export interface TabsState {
  /** The base the elements' ids are built from. */
  baseId: string

  /** The id of the selected tab. */
  selectedId: string

  /** The ids of the tabs that were selected at least once, whose panels have rendered. */
  visitedIds: string[]

  /** Selects the tab with the given id. */
  select: (id: string) => void

  /** Remembers, or forgets when `element` is `null`, the button of the tab with the given id. */
  setTabElement: (id: string, element: HTMLButtonElement | null) => void

  /** Moves the selection and the focus for an arrow, Home or End key pressed on the tab at `index`. */
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>, index: number) => void
}
