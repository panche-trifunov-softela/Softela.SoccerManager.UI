import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { VIEW_LABEL_PREFIX } from './constants'

import styles from './SquadInfoButton.module.scss'

import type { SquadInfoButtonProps } from './types'

/**
 * The button at the end of a squad row that opens the player's profile.
 *
 * - It is never disabled: not while the board is locked, and not for a player who cannot be picked.
 * - It is a button of its own, beside the row's button and never inside it, so pressing it never
 *   changes the lineup's selection.
 *
 * @param props The player to open, and what to call when it is pressed.
 * @returns The rendered button.
 */
export function SquadInfoButton({ playerId, name, onInfo }: SquadInfoButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.button} focus-ring`}
      aria-label={`${VIEW_LABEL_PREFIX}${name}`}
      aria-haspopup="dialog"
      onClick={() => {
        onInfo(playerId, name)
      }}
    >
      <FontAwesomeIcon icon={faCircleInfo} />
    </button>
  )
}
