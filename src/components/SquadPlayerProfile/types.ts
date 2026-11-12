import type { PlayerHeaderProps } from '@/components/PlayerHeader'
import type { PositionsPitchProps } from '@/components/PositionsPitch'
import type { SquadPlayerProfileDto } from '@/types/squadPlayerProfileDto'

import type { PlayerStatusProps } from './components/PlayerStatus'

/** What `SquadPlayerProfile` is handed. */
export interface SquadPlayerProfileProps {
  /** The selected club: the league team whose game world the player is read in. */
  leagueTeamId: number

  /** The player whose profile is shown. */
  playerId: number
}

/**
 * Why a read failed: `not-found` when the player has no registration in the club's league,
 * `forbidden` when the caller does not manage the club, `failed` for anything else.
 */
export type SquadPlayerProfileFailure = 'not-found' | 'forbidden' | 'failed'

/** One finished read, kept with the club and the player it was made for. */
export interface SquadPlayerProfileRead {
  /** The league team the read was made for. */
  leagueTeamId: number

  /** The player the read was made for. */
  playerId: number

  /** The profile read, or `null` when the read failed. */
  profile: SquadPlayerProfileDto | null

  /** Why the read failed, or `null` when it did not. */
  failure: SquadPlayerProfileFailure | null
}

/** What `useSquadPlayerProfile` exposes to the panel. */
export interface SquadPlayerProfileState {
  /** The header's props, or `null` while the profile is not there to show. */
  header: PlayerHeaderProps | null

  /** The positions pitch's props, or `null` while the profile is not there to show. */
  pitch: PositionsPitchProps | null

  /** The status section's props, or `null` while the profile is not there to show. */
  status: PlayerStatusProps | null

  /**
   * Whether the player has no registration in the club's league, so the panel shows the player's
   * own profile instead.
   */
  isNotFound: boolean

  /** What shows instead of the profile: that it is loading or why it could not be read. */
  message: string | null
}
