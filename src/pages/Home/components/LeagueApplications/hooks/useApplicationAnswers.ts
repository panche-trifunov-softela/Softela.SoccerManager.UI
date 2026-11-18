import { useAnswerFlow } from '@/hooks/useAnswerFlow'
import { updateLeagueTeamManagerApplication } from '@/services/api'

import { APPLICATION_ANSWERS } from '../constants'
import { toApplicationName } from '../utils'

import type { IncomingLeagueTeamManagerApplicationDto } from '@/types/incomingLeagueTeamManagerApplicationDto'

import type { ApplicationAnswersState } from '../types'

/**
 * Accepts and rejects the applications the section shows, one at a time, through the shared
 * answer flow.
 *
 * - An application is keyed by its id, answered with the status of the pressed answer and toasted
 *   under its club's name.
 * - Each answer's toast and status are the ones `APPLICATION_ANSWERS` lists.
 *
 * @param applications The applications the section shows.
 * @param refresh Reads the applications again.
 * @returns The props of each application's answer buttons.
 */
export function useApplicationAnswers(
  applications: readonly IncomingLeagueTeamManagerApplicationDto[],
  refresh: () => void,
): ApplicationAnswersState {
  const toKey = (application: IncomingLeagueTeamManagerApplicationDto) => String(application.id)

  const { sending, isLocked, answer } = useAnswerFlow({
    items: applications,
    toKey,
    send: (application, choice) =>
      updateLeagueTeamManagerApplication({
        id: application.id,
        status: APPLICATION_ANSWERS[choice].status,
      }),
    toMessages: (_application, choice) => APPLICATION_ANSWERS[choice],
    toToastPrefix: (application) => application.teamName,
    refresh,
  })

  const answerButtonsFor: ApplicationAnswersState['answerButtonsFor'] = (application) => ({
    subjectName: toApplicationName(application),
    sending: sending?.key === toKey(application) ? sending.choice : null,
    isLocked,
    onAnswer: (choice) => {
      answer(application, choice)
    },
  })

  return { answerButtonsFor }
}
