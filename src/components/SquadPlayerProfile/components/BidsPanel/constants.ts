import type { PlayerTabReadMessages } from '../../types'

/** The sign drawn at the start of an amount of money. */
export const EURO_SIGN = '€'

/** The words, hidden from the eye, that follow the label of an amount of money. */
export const IN_EUROS_LABEL = ' in euros'

/** What an optional amount shows while it is empty. */
export const OPTIONAL_PLACEHOLDER = 'Optional'

/** What the submit button says while a bid is being sent. */
export const PLACING_BID_LABEL = 'Placing bid…'

/** The most digits an amount of money takes, a trillion euros less one. */
export const MONEY_MAX_DIGITS = 12

/** Writes a number with the reader's locale's thousands separators. */
export const GROUPED_NUMBER_FORMAT = new Intl.NumberFormat()

/** The heading over the list of the clubs that have a bid on the player. */
export const CURRENT_BIDS_HEADING = 'Current bids'

/**
 * What the read of the current bids says while it loads and, when no better reason is known, when
 * it fails.
 */
export const CURRENT_BIDS_READ_MESSAGES: PlayerTabReadMessages = {
  loading: 'Loading the current bids…',
  failed: 'The current bids could not be loaded.',
}

/** What shows under the heading when no club has a bid on the player. */
export const NO_CURRENT_BIDS_MESSAGE = 'No bids for this player yet.'
