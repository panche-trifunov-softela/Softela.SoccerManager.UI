import type { ReactNode } from 'react'

/** What `HomeSection` is handed. */
export interface HomeSectionProps {
  /** The section's title. */
  title: string

  /** The heading element the title renders as: `h2` unless the section carries the page's title. */
  titleAs?: 'h1' | 'h2'

  /** What sits at the end of the title row. */
  action?: ReactNode

  /** The section's content, under the title row. */
  children: ReactNode
}
