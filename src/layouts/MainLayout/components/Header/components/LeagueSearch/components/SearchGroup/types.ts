import type { ReactNode } from 'react'

/** Props of `SearchGroup`. */
export interface SearchGroupProps {
  /** The element id of the heading, which names the group. */
  headingId: string

  /** The heading text. */
  heading: string

  /** How many of how many matches are listed, or `null` when the group lists them all. */
  countText: string | null

  /** The group's options. */
  children: ReactNode
}
