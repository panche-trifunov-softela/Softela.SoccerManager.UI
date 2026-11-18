import type { AnswerChoice } from '@/types/answerChoice'

import type { ApplicationAnswerSpec } from './types'

/** The line shown when the applications for clubs in the manager's leagues could not be read. */
export const LEAGUE_APPLICATIONS_LOAD_FAILED_MESSAGE =
  'Applications for clubs in your league could not be loaded.'

/** How each answer is sent, and how a toast puts its outcome into words. */
export const APPLICATION_ANSWERS: Readonly<Record<AnswerChoice, ApplicationAnswerSpec>> = {
  accept: {
    status: 2,
    answeredMessage: 'The application was accepted.',
    failedMessage: 'The application could not be accepted.',
  },
  reject: {
    status: 3,
    answeredMessage: 'The application was rejected.',
    failedMessage: 'The application could not be rejected.',
  },
}
