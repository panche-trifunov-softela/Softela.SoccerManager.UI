import { PlayerHeader } from '@/components/PlayerHeader'
import { PositionsPitch } from '@/components/PositionsPitch'

import { usePlayerProfile } from './usePlayerProfile'

import styles from './PlayerProfile.module.scss'

import type { PlayerProfileProps } from './types'

/**
 * A player's profile from the players table, as the side panel shows it when no club is selected or
 * the player is a free agent: the header beside a pitch with the player's positions, the pitch
 * under it on a phone.
 *
 * @param props The player whose profile to show, and whether they are a free agent.
 * @returns The rendered profile. While it loads, or when it could not be read, a message shows in
 * a live region instead.
 */
export function PlayerProfile({ playerId, isFreeAgent = false }: PlayerProfileProps) {
  const { header, pitch, message } = usePlayerProfile(playerId, isFreeAgent)

  return (
    <div>
      {header !== null && pitch !== null && (
        <div className={styles.top}>
          <PlayerHeader {...header} />

          <PositionsPitch {...pitch} />
        </div>
      )}

      <div role="status">{message !== null && <p className="label">{message}</p>}</div>
    </div>
  )
}
