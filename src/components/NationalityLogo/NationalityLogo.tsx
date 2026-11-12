import { faFlag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { MISSING } from '@/constants/missing'

import type { NationalityLogoProps } from './types'

/**
 * A player's nationality as their national team's crest in a bordered square, or a flag icon in
 * the square when the team has none.
 *
 * - A blank address counts as none.
 * - The square carries the team's name as its accessible name and as a hover tooltip, since no
 *   text stands beside it.
 * - A player with no national team shows the missing-value mark.
 *
 * @param props The national team's name and the address of its crest, if any.
 * @returns The rendered crest.
 */
export function NationalityLogo({ name, logoUrl }: NationalityLogoProps) {
  if (name === null) return MISSING

  if (!logoUrl?.trim()) {
    return (
      <span className="square square--icon" role="img" aria-label={name} title={name}>
        <FontAwesomeIcon icon={faFlag} />
      </span>
    )
  }

  return (
    <img
      className="square-avatar square-avatar--logo"
      src={logoUrl}
      alt={name}
      title={name}
      loading="lazy"
    />
  )
}
