import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './ManagerPhoto.module.scss'

import type { ManagerPhotoProps } from './types'

/**
 * A manager's photo in an 80px circle, or a person icon in the same circle when there is none.
 *
 * - A blank address counts as none.
 * - The photo is decorative, so it is hidden from assistive technology.
 *
 * @param props The address of the photo, if any.
 * @returns The rendered photo.
 */
export function ManagerPhoto({ imageUrl }: ManagerPhotoProps) {
  if (!imageUrl?.trim()) {
    return (
      <span className={`avatar ${styles.placeholder}`} aria-hidden="true">
        <FontAwesomeIcon icon={faUser} />
      </span>
    )
  }

  return <img className={`avatar ${styles.photo}`} src={imageUrl} alt="" loading="lazy" />
}
