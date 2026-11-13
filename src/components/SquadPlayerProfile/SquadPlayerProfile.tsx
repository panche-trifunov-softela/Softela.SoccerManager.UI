import { PlayerHeader } from '@/components/PlayerHeader'
import { PlayerProfile } from '@/components/PlayerProfile'
import { PositionsPitch } from '@/components/PositionsPitch'

import { InjuriesPanel } from './components/InjuriesPanel'
import { PlayerStatus } from './components/PlayerStatus'
import { Tabs } from './components/Tabs'
import { TransfersPanel } from './components/TransfersPanel'
import {
  HISTORY_TABS_LABEL,
  INJURIES_TAB_ID,
  INJURIES_TAB_LABEL,
  TRANSFERS_TAB_ID,
  TRANSFERS_TAB_LABEL,
} from './constants'
import { useSquadPlayerProfile } from './useSquadPlayerProfile'

import styles from './SquadPlayerProfile.module.scss'

import type { SquadPlayerProfileProps } from './types'

/**
 * A player as the selected club's league has them, as the side panel shows it when a club is
 * selected: the header beside a pitch with the player's positions, the pitch under it on a phone,
 * and under both the player's condition, morale and suspension, then two tabs: the player's
 * transfer history and their injury history in the club's league.
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

          <div className={styles.history}>
            <Tabs
              label={HISTORY_TABS_LABEL}
              tabs={[
                {
                  id: TRANSFERS_TAB_ID,
                  label: TRANSFERS_TAB_LABEL,
                  panel: <TransfersPanel leagueTeamId={leagueTeamId} playerId={playerId} />,
                },
                {
                  id: INJURIES_TAB_ID,
                  label: INJURIES_TAB_LABEL,
                  panel: <InjuriesPanel leagueTeamId={leagueTeamId} playerId={playerId} />,
                },
              ]}
            />
          </div>
        </>
      )}

      <div role="status">{message !== null && <p className="label">{message}</p>}</div>
    </div>
  )
}
