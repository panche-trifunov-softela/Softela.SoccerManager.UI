import { faFutbol } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './ClubLogo.module.scss'

import type { ClubLogoProps } from './types'

/**
 * A club's crest: its logo, or a football when it has none.
 *
 * - `md` is the 40px crest of a table row. Without a logo it is a bordered square.
 * - `lg` is the 80px crest of a card or panel header. Without a logo it is a football in a box
 *   of the same size.
 * - The crest is decorative, so it is hidden from assistive technology: the club's name always
 *   stands beside it.
 *
 * @param props The address of the logo, if any, and the size to draw it at.
 * @returns The rendered crest.
 */
export function ClubLogo({ logoUrl, size }: ClubLogoProps) {
  if (size === 'md' && logoUrl === null) {
    return (
      <span className="square square--icon" aria-hidden="true">
        <FontAwesomeIcon icon={faFutbol} />
      </span>
    )
  }

  const sizeClass = size === 'md' ? `club-logo--md ${styles.md}` : `club-logo--lg ${styles.lg}`

  return (
    <span className={`club-logo ${sizeClass}`} aria-hidden="true">
      {logoUrl === null ? <FontAwesomeIcon icon={faFutbol} /> : <img src={logoUrl} alt="" />}
    </span>
  )
}
