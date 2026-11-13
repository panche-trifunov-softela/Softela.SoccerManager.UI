import type { PlayerTabReadMessages } from '../../types'

/** What the transfer read says while it loads and, when no better reason is known, when it fails. */
export const TRANSFERS_READ_MESSAGES: PlayerTabReadMessages = {
  loading: 'Loading the transfer history…',
  failed: 'The transfer history could not be loaded.',
}

/** What shows when the player has no transfers in the club's league. */
export const NO_TRANSFERS_MESSAGE = 'No transfers recorded.'

/** What a fee of zero reads as. */
export const FREE_TRANSFER_TEXT = 'Free'

/** The note under the fee of a loan. */
export const LOAN_NOTE = 'Loan'

/** What a swap reads as: the note under its fee, or the fee itself when none was paid. */
export const SWAP_TEXT = 'Swap'

/** The word before a season's number, as in `Season 3`. */
export const SEASON_LABEL = 'Season'

/** The sign between the player sold and the players swapped for him. */
export const SWAP_ARROW = '⇄'

/** What sits between the names of the swapped players. */
export const SWAP_PLAYER_SEPARATOR = ', '
