import type { PlayerTabReadMessages } from '../../types'

/** What the bids read says while it loads and, when no better reason is known, when it fails. */
export const BIDS_READ_MESSAGES: PlayerTabReadMessages = {
  loading: 'Loading the bids…',
  failed: 'The bids could not be loaded.',
}

/** What shows under the transfer tab when no transfer bid was received. */
export const NO_TRANSFER_BIDS_MESSAGE = 'No transfer bids received.'

/** What shows under the loan tab when no loan bid was received. */
export const NO_LOAN_BIDS_MESSAGE = 'No loan bids received.'
