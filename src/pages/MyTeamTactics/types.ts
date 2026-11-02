import type { FormationDto } from '@/types/formationDto'
import type { LeagueTeamSquadMemberDto } from '@/types/leagueTeamSquadMemberDto'
import type { MatchLineupDto } from '@/types/matchLineupDto'
import type { NextMatchDto } from '@/types/nextMatchDto'

import type { BenchProps } from './components/Bench'
import type { LineupSquadListProps, SquadRowView } from './components/LineupSquadList'
import type { LineupToolbarProps } from './components/LineupToolbar'
import type { NextMatchHeaderProps } from './components/NextMatchHeader'
import type { PitchProps } from './components/Pitch'

/** One finished read of the page's data, kept with the club it was made for. */
export interface TacticsRead {
  /** The league team the read was made for. */
  leagueTeamId: number

  /** The club's next match with its lineup, or `null` when it has none or the read failed. */
  nextMatch: NextMatchDto | null

  /** The club's squad in the API's order, empty when the read failed. */
  squad: LeagueTeamSquadMemberDto[]

  /** Every formation the API offers, in its order, empty when the read failed. */
  formations: FormationDto[]

  /** The fixed sentence that says the read failed, or `null` when it did not. */
  error: string | null

  /** How many reloads had been asked for when this read was started. */
  reloadCount: number
}

/** What `useTacticsRead` exposes to the page. */
export interface TacticsReadState {
  /** The finished read for the club the address names, or `null` while that read is in flight. */
  read: TacticsRead | null

  /** Whether a club is named and its read has not finished yet. */
  isLoading: boolean

  /**
   * Whether the shown read is older than the latest reload asked for, so a newer read is in
   * flight and the board is about to change under the viewer.
   */
  isReloading: boolean

  /** Reads the page's data again, keeping the old read on screen until the new one lands. */
  reload: () => void

  /** Swaps the shown match's lineup for one the API returned, when it still belongs to it. */
  replaceLineup: (lineup: MatchLineupDto) => void
}

/** What the manager has picked up on the board: a slot, or a player who is not in the lineup. */
export type LineupSelection =
  | { kind: 'slot'; slotNumber: number }
  | { kind: 'player'; playerId: number }

/** What the manager tapped: a slot, or a player. */
export type LineupTap = LineupSelection

/** One "put the player in the slot" change to send. */
export interface SlotChange {
  /** The number of the slot to put the player in. */
  slotNumber: number

  /** The id of the player to put in the slot, or `null` to empty the slot. */
  playerId: number | null
}

/** What a tap does to the selection and to the lineup. */
export interface TapOutcome {
  /** The selection after the tap, or `null` when nothing stays selected. */
  selection: LineupSelection | null

  /** The change to send, or `null` when the tap only changes the selection. */
  change: SlotChange | null
}

/** Where a save stands. */
export type SaveState = 'idle' | 'saving' | 'saved' | 'failed'

/** A selection kept with the match it was made on. */
export interface MatchSelection {
  /** The id of the match the selection belongs to. */
  matchId: number

  /** What was selected. */
  selection: LineupSelection
}

/** A settled save state kept with the match it belongs to. */
export interface MatchSaveStatus {
  /** The id of the match the save belongs to. */
  matchId: number

  /** How the save ended. */
  saveState: Exclude<SaveState, 'idle' | 'saving'>
}

/** A lineup's players, found from either side. */
export interface LineupIndex {
  /** The id of the player in each filled slot, by slot number. */
  playerBySlot: ReadonlyMap<number, number>

  /** The number of the slot each lineup player is in, by player id. */
  slotByPlayer: ReadonlyMap<number, number>
}

/** What `toTacticsView` weighs. */
export interface TacticsViewInput {
  /** Whether the address names a valid league team id. */
  hasLeagueTeamId: boolean

  /** Whether the read for this club is still in flight. */
  isLoading: boolean

  /** The finished read for this club, or `null` while there is none. */
  read: TacticsRead | null

  /** The editor's state and actions, which the board hands to its controls. */
  editor: LineupEditorState
}

/** What `useLineupEditor` is handed. */
export interface LineupEditorOptions {
  /** The league team the address names, or `null` when it names none. */
  leagueTeamId: number | null

  /** Whether the viewer runs the club, and so a first visit may pick the lineup for them. */
  canAutoPickOnFirstVisit: boolean

  /** The match whose lineup the board edits, or `null` when there is none. */
  nextMatch: NextMatchDto | null

  /** Whether the page's data is being read again, so the lineup shown may be out of date. */
  isReloading: boolean

  /** Reads the page's data again. */
  reload: () => void

  /** Swaps the shown match's lineup for one the API returned. */
  replaceLineup: (lineup: MatchLineupDto) => void
}

/** What `useLineupEditor` exposes to the page. */
export interface LineupEditorState {
  /** What is picked up on the board, or `null` when nothing is. */
  selection: LineupSelection | null

  /** Where the latest save stands: saving while any request is outstanding. */
  saveState: SaveState

  /**
   * Whether a request is outstanding, for any match, or the page's data is being read again, so
   * every control refuses input.
   */
  isLocked: boolean

  /** Handles a tap on a slot. */
  tapSlot: (slotNumber: number) => void

  /** Handles a tap on a player in the squad list. */
  tapPlayer: (playerId: number) => void

  /** Empties the selected slot. */
  removeSelected: () => void

  /** Drops the selection without changing the lineup. */
  clearSelection: () => void

  /** Switches the lineup to another formation. */
  changeFormation: (formationId: number) => void

  /** Replaces the lineup with one picked from the squad. */
  autoPick: () => void
}

/** A lineup player joined to the squad, as a slot shows them. */
export interface SlotPlayerView {
  /** The id of the player. */
  playerId: number

  /** The player's full name. */
  name: string

  /** The name as a marker shows it, the surname, for example `De Bruyne`. */
  markerName: string

  /** The address of the player's photo, or `null` when there is none. */
  imageUrl: string | null

  /** The player's current rating, or `null` when they have none. */
  rating: number | null

  /** Whether the player is suspended. */
  isSuspended: boolean
}

/** One slot of the lineup as the board draws it. */
export interface SlotView {
  /** The number of the slot, from 1 to 19. */
  slotNumber: number

  /** The slot's position short name, or the bench label on a reserve slot. */
  label: string

  /** The full name of the slot's position, or `null` on a reserve slot. */
  positionName: string | null

  /** How far across the screen the slot sits, in percent, or `null` when it is not placed. */
  screenX: number | null

  /** How far down the screen the slot sits, in percent, or `null` when it is not placed. */
  screenY: number | null

  /** The player in the slot, or `null` when it is empty. */
  player: SlotPlayerView | null

  /** Whether the slot is the selected one. */
  isSelected: boolean

  /** What a screen reader announces for the slot. */
  ariaLabel: string
}

/** The squad split by where each player stands in the lineup. */
export interface SquadGroups {
  /** The players in the starting eleven, by slot number. */
  starters: SquadRowView[]

  /** The players on the bench, by slot number. */
  bench: SquadRowView[]

  /** The players in neither, in the squad's own order. */
  notSelected: SquadRowView[]
}

/** The props of every part of the board. */
export interface TacticsBoard {
  /** The next match's header. */
  header: NextMatchHeaderProps

  /** The formation, auto pick and selection controls. */
  toolbar: LineupToolbarProps

  /** The starting eleven on the pitch. */
  pitch: PitchProps

  /** The reserves. */
  bench: BenchProps

  /** The squad list. */
  squad: LineupSquadListProps
}

/** What the page shows: a fixed sentence, or the board. */
export type TacticsView =
  | { kind: 'message'; message: string }
  | { kind: 'board'; board: TacticsBoard }

/** What `useMyTeamTactics` exposes to the page. */
export interface MyTeamTacticsState {
  /**
   * The club and its game world, for example `Bayer Leverkusen – Elite Managers`, or `null` when
   * the signed-in manager does not run the club or their clubs are not read yet.
   */
  subtitle: string | null

  /** What shows under the title bar. */
  view: TacticsView
}
