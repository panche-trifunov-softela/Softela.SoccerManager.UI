import { ClubLogo } from '@/components/ClubLogo'

import { toTeamOptionLabel } from '../../utils'

import styles from './TeamOption.module.scss'

import type { TeamOptionProps } from './types'

/**
 * One team of the search results: its crest and name, in a row as tall as a player's.
 *
 * - A team with no logo shows the crest's fallback square.
 * - The option has one accessible name, the team's name and that it is a team, and everything
 *   inside the option is hidden from assistive technology.
 * - The active option is drawn like a hovered one, and has an accent bar at its start as well.
 *
 * @param props The option's id, the team, whether the option is active, and what to call when it
 * is pressed.
 * @returns The rendered option.
 */
export function TeamOption({ id, team, isActive, onPick }: TeamOptionProps) {
  return (
    <li
      id={id}
      role="option"
      aria-selected={isActive}
      aria-label={toTeamOptionLabel(team)}
      className={isActive ? `${styles.option} ${styles['option--active']}` : styles.option}
      onClick={() => onPick(team)}
    >
      <ClubLogo logoUrl={team.teamLogoUrl} size="md" />

      <span aria-hidden="true" className={`text-overflow ${styles.name}`}>
        {team.teamName}
      </span>
    </li>
  )
}
