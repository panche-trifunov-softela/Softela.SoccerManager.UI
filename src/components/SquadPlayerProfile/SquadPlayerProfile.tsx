import { PlayerHeader } from '@/components/PlayerHeader'
import { PlayerProfile } from '@/components/PlayerProfile'
import { PositionsPitch } from '@/components/PositionsPitch'

import { PlayerStatus } from './components/PlayerStatus'
import { useSquadPlayerProfile } from './useSquadPlayerProfile'

import styles from './SquadPlayerProfile.module.scss'

import type { SquadPlayerProfileProps } from './types'

/**
 * A player as the selected club's game world has them, as the side panel shows it when a club is
 * selected: the header beside a pitch with the player's positions, the pitch under it on a phone,
 * and under both the player's condition, morale and suspension.
 *
 * A player with no registration in the club's league is shown as their own profile instead.
 *
 * @param props The selected club and the player whose profile to show.
 * @returns The rendered profile. While it loads, or when it could not be read, a message shows in
 * a live region instead.
 */
export function SquadPlayerProfile({ leagueTeamId, playerId }: SquadPlayerProfileProps) {
  const { header, pitch, status, isNotFound, message } = useSquadPlayerProfile(
    leagueTeamId,
    playerId,
  )

  if (isNotFound) return <PlayerProfile playerId={playerId} />

  return (
    <div>
      {header !== null && pitch !== null && status !== null && (
        <>
          <div className={styles.top}>
            <PlayerHeader {...header} />

            <PositionsPitch {...pitch} />
          </div>

          <PlayerStatus {...status} />
        </>
      )}

      <div role="status">{message !== null && <p className="label">{message}</p>}</div>
    </div>
  )
}
