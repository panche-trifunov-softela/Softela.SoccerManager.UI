import { Link } from 'react-router'

import { ClubLogo } from '@/components/ClubLogo'

import styles from './ClubCard.module.scss'

import type { ClubCardProps } from './types'

/**
 * A club in its league, as a card.
 *
 * - With `to`, the club's name is the card's link, stretched over the whole card. Without it, the
 *   name is plain text and the card links nowhere.
 * - The aside sits at the end of the header; the footer is the caller's, and wraps onto a second
 *   line when its content does not fit on one.
 *
 * @param props The club, its league, where the card links to, the header's aside, and the
 * footer's content.
 * @returns The rendered card.
 */
export function ClubCard({ logoUrl, teamName, leagueName, to, aside, children }: ClubCardProps) {
  return (
    <article className="card border-color-bottom">
      <div className={`d-flex align-items-center g-16 ${styles.header}`}>
        <ClubLogo logoUrl={logoUrl} size="lg" />

        <div className={styles.names}>
          {to === undefined ? (
            <p className="h4 text-overflow">{teamName}</p>
          ) : (
            <Link to={to} className={`h4 text-overflow ${styles.link}`}>
              {teamName}
            </Link>
          )}
          <p className="label text-10">{leagueName}</p>
        </div>

        {aside}
      </div>

      <div className={`d-flex flex-wrap align-items-center justify-content-between g-8 ${styles.footer}`}>
        {children}
      </div>
    </article>
  )
}
