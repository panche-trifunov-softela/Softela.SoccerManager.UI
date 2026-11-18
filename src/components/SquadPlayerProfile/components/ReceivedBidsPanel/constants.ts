import type { AnswerChoice } from '@/types/answerChoice'

import type { PlayerTabReadMessages } from '../../types'

import type { BidAnswerSpec, BidKind } from './types'

/** What the bids read says while it loads and, when no better reason is known, when it fails. */
export const BIDS_READ_MESSAGES: PlayerTabReadMessages = {
  loading: 'Loading the bids…',
  failed: 'The bids could not be loaded.',
}

/** What shows under the transfer tab when no transfer bid was received. */
export const NO_TRANSFER_BIDS_MESSAGE = 'No transfer bids received.'

/** What shows under the loan tab when no loan bid was received. */
export const NO_LOAN_BIDS_MESSAGE = 'No loan bids received.'

/** What sits between a tab's label and its number of bids, and between the parts of a line. */
export const DOT_SEPARATOR = ' · '

/** What sits between the names of the swapped players. */
export const SWAP_PLAYER_SEPARATOR = ', '

/** What starts the line of the players the bidding club offers in swap. */
export const SWAP_LINE_LABEL = 'Swap'

/** What starts the line of the buyback. */
export const BUYBACK_LINE_LABEL = 'Buyback'

/** What sits between a buyback's price and the seasons it stays valid for. */
export const BUYBACK_WITHIN_TEXT = 'within'

/** What starts the part of a loan's line that names the option to buy the player. */
export const BUY_OPTION_LABEL = 'Buy option'

/** How each answer to each kind of bid is sent, and how a toast puts its outcome into words. */
export const BID_ANSWERS: Readonly<
  Record<BidKind, Readonly<Record<AnswerChoice, BidAnswerSpec>>>
> = {
  transfer: {
    accept: {
      status: 2,
      answeredMessage: 'Transfer bid accepted.',
      failedMessage: 'The transfer bid could not be accepted.',
    },
    reject: {
      status: 3,
      answeredMessage: 'Transfer bid rejected.',
      failedMessage: 'The transfer bid could not be rejected.',
    },
  },
  loan: {
    accept: {
      status: 2,
      answeredMessage: 'Loan bid accepted.',
      failedMessage: 'The loan bid could not be accepted.',
    },
    reject: {
      status: 3,
      answeredMessage: 'Loan bid rejected.',
      failedMessage: 'The loan bid could not be rejected.',
    },
  },
}
