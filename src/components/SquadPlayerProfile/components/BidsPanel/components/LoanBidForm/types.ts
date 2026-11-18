import type { SubmitEventHandler } from 'react'

import type { BidInputField, BidReadOnlyField, BidSelectField } from '../../types'

/** What `LoanBidForm` is handed. */
export interface LoanBidFormProps {
  /** The bidding club: the acting club's league team id. */
  leagueTeamId: number

  /** The player the bid is for. */
  playerId: number

  /** The player's name, which the toasts say. */
  playerName: string

  /** The player's contract wage at their club, in euros per week. */
  wage: number

  /**
   * Runs once a bid went through and the form was emptied, so the panel can read the current bids
   * again.
   */
  onSent: () => void
}

/** What the reader has typed into the loan bid form. */
export interface LoanBidDraft {
  /** The digits of the loan fee; empty when none is typed. */
  fee: string

  /** The chosen number of seasons the loan lasts. */
  seasons: string

  /** The digits of the buy option's value; empty when there is no option. */
  buyOption: string
}

/** Why each field of the loan bid form that can be invalid is not valid. */
export interface LoanBidErrors {
  /** Why the loan fee is not valid, or `null` when it is. */
  fee: string | null
}

/** What `useLoanBidForm` exposes to the view. */
export interface LoanBidFormState {
  /** The loan fee field. */
  fee: BidInputField

  /** The loan length field. */
  length: BidSelectField

  /** The buy option field. */
  buyOption: BidInputField

  /** The salary field, which shows the player's wage and cannot be edited. */
  salary: BidReadOnlyField

  /** Whether a bid is being sent. */
  isPending: boolean

  /** Validates the form and, when it is valid, sends the bid. */
  onSubmit: SubmitEventHandler<HTMLFormElement>
}
