import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import type { PlayerPhotoProps } from './types'

/**
 * A player's photo cropped to the head, or a person icon in a bordered square when there is none.
 *
 * - A blank address counts as none.
 * - The photo is decorative, so it is hidden from assistive technology: the player's name always
 *   stands beside it.
 *
 * @param props The address of the photo, if any.
 * @returns The rendered photo.
 */
export function PlayerPhoto({ imageUrl }: PlayerPhotoProps) {
  if (!imageUrl?.trim()) {
    return (
      <span className="square square--icon" aria-hidden="true">
        <FontAwesomeIcon icon={faUser} />
      </span>
    )
  }

  return <img className="square-avatar square-avatar--photo" src={imageUrl} alt="" loading="lazy" />
}
