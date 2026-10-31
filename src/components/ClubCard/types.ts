import type { ReactNode } from 'react'

/** What `ClubCard` is handed. */
export interface ClubCardProps {
  /** The address of the club's logo, or `null` when it has none. */
  logoUrl: string | null

  /** The club's name, which is also the card's link when the card has one. */
  teamName: string

  /** The name of the league the club plays in. */
  leagueName: string

  /** Where the card links to; without it the card links nowhere. */
  to?: string

  /** What sits at the end of the header, after the club's name and league. */
  aside?: ReactNode

  /** The footer's content. */
  children: ReactNode
}
