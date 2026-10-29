import { Link } from 'react-router'

import { ClubLogo } from '@/components/ClubLogo'

import styles from './ClubCard.module.scss'

import type { ClubCardProps } from './types'

/**
 * A club in its league, as a card.
 *
 * - The club's name is the card's link, stretched over the whole card.
 * - The footer is the caller's.
 *
 * @param props The club, its league, where the card links to, and the footer's content.
 * @returns The rendered card.
 */
export function ClubCard({ logoUrl, teamName, leagueName, to, children }: ClubCardProps) {
  return (
    <article className="card border-color-bottom">
      <div className="card_header d-flex align-items-center g-16">
        <ClubLogo logoUrl={logoUrl} size="lg" />

        <div className={styles.names}>
          <Link to={to} className={`h4 text-overflow ${styles.link}`}>
            {teamName}
          </Link>
          <p className="label text-10">{leagueName}</p>
        </div>
      </div>

      <div className="card_footer--sm justify-content-between">{children}</div>
    </article>
  )
}
