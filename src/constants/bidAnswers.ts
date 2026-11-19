import type { AnswerChoice } from '@/types/answerChoice'
import type { BidAnswerSpec } from '@/types/bidAnswerSpec'
import type { BidKind } from '@/types/bidKind'

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
