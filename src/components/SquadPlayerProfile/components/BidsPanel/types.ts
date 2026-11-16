import type { ChangeEventHandler, SubmitEventHandler } from 'react'

import type { CreatedResourceDto } from '@/types/createdResourceDto'

import type { BidsTarget } from '../../types'

/** What `BidsPanel` is handed. */
export interface BidsPanelProps extends BidsTarget {
  /** The bidding club: the selected club's league team id. */
  leagueTeamId: number

  /** The player the bids are placed for. */
  playerId: number
}

/** The line under a bid field's control: a hint, or why the field is not valid. */
export interface BidFieldMessage {
  /** The words of the line. */
  text: string

  /** Whether the line says why the field is not valid, rather than guiding the reader. */
  isError: boolean
}

/** What a text input of a bid form needs to show a value that cannot be edited. */
export interface BidReadOnlyField {
  /** The id of the input. */
  id: string

  /** What the input shows. */
  value: string

  /** The line under the input, or `null` when there is none. */
  message: BidFieldMessage | null

  /** The id of the line under the input, or `null` when there is none. */
  messageId: string | null
}

/** What a text input of a bid form needs to be shown and edited. */
export interface BidInputField extends BidReadOnlyField {
  /** Whether the input is not valid. */
  isInvalid: boolean

  /** Keeps the digits in step with the input. */
  onChange: ChangeEventHandler<HTMLInputElement>

  /** Shows the digits ungrouped for editing. */
  onFocus: () => void

  /** Shows the digits grouped again. */
  onBlur: () => void
}

/** What a select of a bid form needs to be shown and wired up. */
export interface BidSelectField {
  /** The id of the select. */
  id: string

  /** The value of the chosen option. */
  value: string

  /** The line under the select, or `null` when there is none. */
  message: BidFieldMessage | null

  /** The id of the line under the select, or `null` when there is none. */
  messageId: string | null

  /** Whether the select is not valid. */
  isInvalid: boolean

  /** Whether the select cannot be used for now, though it stays focusable. */
  isDisabled: boolean

  /** Keeps the choice in step with the select. */
  onChange: ChangeEventHandler<HTMLSelectElement>
}

/** One choice of a bid form's select. */
export interface BidSelectOption {
  /** What the option stands for; `''` for the choice of nothing. */
  value: string

  /** The words the option shows. */
  label: string
}

/** One field's id and what is wrong with it. */
export interface BidFieldError {
  /** The id of the field's control. */
  id: string

  /** What is wrong with the field, or `null` when nothing is. */
  error: string | null
}

/** What `useDigitsInput` exposes to a form's hook. */
export interface DigitsInputState {
  /** The digits typed, with no grouping; empty when nothing is typed. */
  digits: string

  /** What the input shows: the digits grouped while the input is not focused, raw while it is. */
  value: string

  /** Keeps only the digits of what was typed. */
  onChange: ChangeEventHandler<HTMLInputElement>

  /** Shows the digits ungrouped. */
  onFocus: () => void

  /** Shows the digits grouped. */
  onBlur: () => void

  /** Empties the input. */
  clear: () => void
}

/** What `useFieldErrors` exposes to a form's hook. */
export interface FieldErrorsState<TErrors> {
  /** Why each field is not valid, or `null` for each that is. */
  errors: TErrors

  /** Replaces the errors of every field. */
  setErrors: (errors: TErrors) => void

  /** Drops the error of one field. */
  clearError: (field: keyof TErrors) => void
}

/** What `useBidSubmit` is handed. */
export interface BidSubmitOptions {
  /** The player the bid is for, named in each toast. */
  playerName: string

  /** What the toast says after the player's name when a bid went through. */
  sentMessage: string

  /** What the toast says after the player's name when the API gave no reason for a failure. */
  failedMessage: string

  /**
   * Checks the form as it stands and shows what is wrong with it. Returns the form's fields in
   * the order they show, each with its error or `null`.
   */
  validate: () => BidFieldError[]

  /** Sends the bid for the form as it stands. */
  send: () => Promise<CreatedResourceDto>

  /** Empties the form once a bid went through. */
  reset: () => void
}

/** What `useBidSubmit` exposes to a form's hook. */
export interface BidSubmitState {
  /** Whether a bid is being sent. */
  isPending: boolean

  /** Handles the form's submission: validates it and, when it is valid, sends the bid. */
  onSubmit: SubmitEventHandler<HTMLFormElement>
}
