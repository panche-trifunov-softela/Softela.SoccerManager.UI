import type { PlayerHeaderProps } from '@/components/PlayerHeader'
import type { PositionsPitchProps } from '@/components/PositionsPitch'
import type { PlayerProfileDto } from '@/types/playerProfileDto'

/** What `PlayerProfile` is handed. */
export interface PlayerProfileProps {
  /** The player whose profile is shown. */
  playerId: number
}

/** One finished read, kept with the player it was made for. */
export interface PlayerProfileRead {
  /** The player the read was made for. */
  playerId: number

  /** The profile read, or `null` when the read failed. */
  profile: PlayerProfileDto | null

  /** The fixed sentence that says the read failed, or `null` when it did not. */
  error: string | null
}

/** What `usePlayerProfile` exposes to the panel. */
export interface PlayerProfileState {
  /** The header's props, or `null` while the profile is not there to show. */
  header: PlayerHeaderProps | null

  /** The positions pitch's props, or `null` while the profile is not there to show. */
  pitch: PositionsPitchProps | null

  /** What shows instead of the profile: that it is loading or that it could not be read. */
  message: string | null
}
