import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './PlayerPhoto.module.scss'

import type { PlayerPhotoProps } from './types'

/**
 * A player's photo cropped to the head, or a person icon in a bordered square when there is none.
 *
 * - A blank address counts as none.
 * - `md` is the 40px photo of a table row and the default. `lg` is the 80px photo of a panel
 *   header, and the person icon is drawn in a box of the same size.
 * - The photo is decorative, so it is hidden from assistive technology: the player's name always
 *   stands beside it.
 *
 * @param props The address of the photo, if any, and the size to draw it at.
 * @returns The rendered photo.
 */
export function PlayerPhoto({ imageUrl, size = 'md' }: PlayerPhotoProps) {
  const sizeClass = size === 'lg' ? ` ${styles.lg}` : ''

  if (!imageUrl?.trim()) {
    return (
      <span className={`square square--icon${sizeClass}`} aria-hidden="true">
        <FontAwesomeIcon icon={faUser} />
      </span>
    )
  }

  return (
    <img
      className={`square-avatar square-avatar--photo${sizeClass}`}
      src={imageUrl}
      alt=""
      loading="lazy"
    />
  )
}
