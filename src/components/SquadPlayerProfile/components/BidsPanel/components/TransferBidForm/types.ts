import type { SubmitEventHandler } from 'react'

import type { LeagueTeamSquadMemberDto } from '@/types/leagueTeamSquadMemberDto'

import type {
  BidFieldError,
  BidInputField,
  BidSelectField,
  BidSelectOption,
} from '../../types'

/** What `TransferBidForm` is handed. */
export interface TransferBidFormProps {
  /** The bidding club: the acting club's league team id. */
  leagueTeamId: number

  /** The player the bid is for. */
  playerId: number

  /** The player's name, which the toasts say. */
  playerName: string

  /** The player's transfer value in this league, in euros. */
  value: number
}

/** What the reader has typed into the transfer bid form. */
export interface TransferBidDraft {
  /** The digits of the transfer fee; empty when none is typed. */
  fee: string

  /** The squad row id chosen in each swap player row, in row order; empty for a row with none. */
  swaps: readonly string[]

  /** The digits of the buyback value; empty when none is typed. */
  buybackValue: string

  /** The chosen number of buyback seasons; empty for no buyback. */
  buybackSeasons: string
}

/** Why each field of the transfer bid form that can be invalid is not valid. */
export interface TransferBidErrors {
  /** Why the transfer fee is not valid, or `null` when it is. */
  fee: string | null

  /** Why the buyback value is not valid, or `null` when it is. */
  buybackValue: string | null

  /** Why the buyback period is not valid, or `null` when it is. */
  buybackPeriod: string | null
}

/** How far the read of the bidding club's squad has come. */
export type SwapSquadStatus = 'loading' | 'ready' | 'failed'

/** One finished read of the bidding club's squad, kept with the club it was made for. */
export interface SwapSquadRead {
  /** The league team the read was made for. */
  leagueTeamId: number

  /** The squad read, or `null` when the read failed. */
  members: LeagueTeamSquadMemberDto[] | null
}

/** What `useSwapSquad` exposes to the form's hook. */
export interface SwapSquadState {
  /** Whether the squad is being read, was read, or could not be read. */
  status: SwapSquadStatus

  /** The squad's players in the API's order; empty until the squad was read. */
  members: LeagueTeamSquadMemberDto[]
}

/** One swap player row: the squad row id chosen in it and why that choice is not valid. */
export interface SwapRow {
  /** The squad row id chosen; empty while none is. */
  playerId: string

  /** Why the row is not valid, or `null` when it is. */
  error: string | null
}

/** What the add button shows, for a form that has a place for one. */
export interface SwapAddState {
  /** Whether pressing the button adds a row. */
  canAdd: boolean

  /** The words that say why the button cannot add a row, or `null` when it can. */
  hint: string | null
}

/** One swap player row as the view shows it. */
export interface SwapRowField {
  /** The words on the row's label, which name its position. */
  label: string

  /** The row's select. */
  field: BidSelectField

  /** The choices of the row's select, in order. */
  options: BidSelectOption[]

  /** The accessible name of the button that removes the row. */
  removeLabel: string

  /** Removes the row. */
  onRemove: () => void
}

/** The button that adds a swap player row, as the view shows it. */
export interface SwapAddField extends SwapAddState {
  /** The id of the button. */
  id: string

  /** The id of the line that gives the hint, or `null` when there is no hint. */
  hintId: string | null

  /** Adds a row when the button can add one, and does nothing otherwise. */
  onAdd: () => void
}

/** What `useSwapRows` exposes to the form's hook. */
export interface SwapRowsState {
  /** The rows, in order. */
  rows: SwapRowField[]

  /** The add button, or `null` when no more rows can be added. */
  add: SwapAddField | null

  /** What a screen reader is told after a row was removed; empty before one was. */
  removedMessage: string

  /** The squad row id chosen in each row, in row order. */
  playerIds: string[]

  /**
   * Shows the error of each row with no player chosen. Returns each row's select id and error, in
   * row order.
   */
  validate: () => BidFieldError[]

  /** Removes every row. */
  reset: () => void
}

/** What `useTransferBidForm` exposes to the view. */
export interface TransferBidFormState {
  /** The transfer fee field. */
  fee: BidInputField

  /** The swap player rows, in order. */
  swapRows: SwapRowField[]

  /** The button that adds a swap player row, or `null` when no more rows can be added. */
  swapAdd: SwapAddField | null

  /** What a screen reader is told after a swap player row was removed. */
  swapRemovedMessage: string

  /** The buyback value field. */
  buybackValue: BidInputField

  /** The buyback period field. */
  buybackPeriod: BidSelectField

  /** Whether a bid is being sent. */
  isPending: boolean

  /** Validates the form and, when it is valid, sends the bid. */
  onSubmit: SubmitEventHandler<HTMLFormElement>
}
