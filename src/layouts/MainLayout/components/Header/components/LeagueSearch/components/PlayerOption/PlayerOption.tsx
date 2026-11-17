import { PlayerPhoto } from '@/components/PlayerPhoto'
import { FREE_AGENT_LABEL } from '@/constants/freeAgent'
import { MISSING } from '@/constants/missing'

import { toPlayerOptionLabel } from '../../utils'

import { POSITION_CLUB_SEPARATOR } from './constants'

import styles from './PlayerOption.module.scss'

import type { PlayerOptionProps } from './types'

/**
 * One player of the search results: their photo, name, position, club and rating.
 *
 * - The second line is the position by its short name, a dot and the club's name, or "Free agent"
 *   for a player with no club. The position and the dot are left out when the player has none.
 * - The option has one accessible name, which carries the full position name and the rating in
 *   words, and everything inside the option is hidden from assistive technology.
 * - A player without a rating shows a plain muted dash, not a chip.
 * - The active option is drawn like a hovered one, and has an accent bar at its start as well.
 *
 * @param props The option's id, the player, whether the option is active, and what to call when
 * it is pressed.
 * @returns The rendered option.
 */
export function PlayerOption({ id, player, isActive, onPick }: PlayerOptionProps) {
  const hasPosition = player.positionShortName !== ''

  return (
    <li
      id={id}
      role="option"
      aria-selected={isActive}
      aria-label={toPlayerOptionLabel(player)}
      className={isActive ? `${styles.option} ${styles['option--active']}` : styles.option}
      onClick={() => onPick(player)}
    >
      <PlayerPhoto imageUrl={player.imageUrl} />

      <span aria-hidden="true" className={styles.text}>
        <span className={`text-overflow ${styles.name}`}>{player.name}</span>

        <span className="text-overflow text-12">
          {hasPosition && `${player.positionShortName}${POSITION_CLUB_SEPARATOR}`}

          {player.teamName ?? FREE_AGENT_LABEL}
        </span>
      </span>

      {player.rating === null ? (
        <span aria-hidden="true" className={styles.no_rating}>
          {MISSING}
        </span>
      ) : (
        <span aria-hidden="true" className="tag tag--accent tag--inline">
          {player.rating}
        </span>
      )}
    </li>
  )
}
