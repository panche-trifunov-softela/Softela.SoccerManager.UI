import type { PlayerHeaderProps } from '@/components/PlayerHeader'
import type { PositionsPitchProps } from '@/components/PositionsPitch'
import type { SquadPlayerProfileDto } from '@/types/squadPlayerProfileDto'

import type { PlayerStatusProps } from './components/PlayerStatus'

/** What `SquadPlayerProfile` is handed. */
export interface SquadPlayerProfileProps {
  /** The selected club: the league team whose league the player is read in. */
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

/**
 * What reads one tab's list for a player in a club's league; each of the panel's `get…` reads
 * of that shape is one.
 */
export type PlayerTabReader<T> = (
  leagueTeamId: number,
  playerId: number,
  signal: AbortSignal,
) => Promise<T>

/** The two sentences a tab's read says, both fixed. */
export interface PlayerTabReadMessages {
  /** What shows while the read is under way. */
  loading: string

  /** What shows, and is toasted when no better reason is known, when the read failed. */
  failed: string
}

/** One finished tab read, kept with the club and the player it was made for. */
export interface PlayerTabSettledRead<T> {
  /** The league team the read was made for. */
  leagueTeamId: number

  /** The player the read was made for. */
  playerId: number

  /** What was read, or `null` when the read failed. */
  data: T | null

  /** The sentence to show when the read failed, or `null` when it did not. */
  message: string | null
}

/** What `usePlayerTabRead` exposes to a tab's panel. */
export interface PlayerTabReadState<T> {
  /** What was read, or `null` while it loads or when the read failed. */
  data: T | null

  /** What shows instead of the data: that it is loading or why it could not be read, else `null`. */
  message: string | null
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
