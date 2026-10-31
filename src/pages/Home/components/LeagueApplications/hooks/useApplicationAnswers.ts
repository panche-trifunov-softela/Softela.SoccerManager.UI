import { useEffect, useRef, useState } from 'react'

import { ApiError, toErrorMessage, updateLeagueTeamManagerApplication } from '@/services/api'
import { toast } from '@/store/toast'

import { APPLICATION_ANSWERS } from '../constants'

import type { IncomingLeagueTeamManagerApplicationDto } from '@/types/incomingLeagueTeamManagerApplicationDto'

import type { ApplicationAnswer } from '../components/AnswerButtons'
import type { ApplicationAnswersState, SentApplicationAnswer } from '../types'

/**
 * Accepts and rejects the applications the section shows, one at a time.
 *
 * - While an answer is under way, every answer button in the section refuses clicks, so two
 *   applicants for one club are never accepted together.
 * - An answer that went through keeps its button saying it is being sent until the applications,
 *   read again, leave its application out. The backend decides which applications remain, so the
 *   ones an acceptance rejected leave with it.
 * - Each outcome is put into words in a toast naming the club.
 * - A failed answer frees the buttons at once. A 400 or a 404 means the card was out of date, so
 *   the applications are read again then too.
 *
 * @param applications The applications the section shows.
 * @param refresh Reads the applications again.
 * @returns The props of each application's answer buttons.
 */
export function useApplicationAnswers(
  applications: readonly IncomingLeagueTeamManagerApplicationDto[],
  refresh: () => void,
): ApplicationAnswersState {
  const [sent, setSent] = useState<SentApplicationAnswer | null>(null)

  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  const isListed = sent !== null && applications.some(({ id }) => id === sent.applicationId)

  // An answer holds the buttons back while it is in flight and, once it went through, until the
  // applications read again leave its application out.
  const sending = sent !== null && (!sent.hasGoneThrough || isListed) ? sent : null

  const send = (
    application: IncomingLeagueTeamManagerApplicationDto,
    answer: ApplicationAnswer,
  ) => {
    if (sending !== null) return

    const { status, answeredMessage, failedMessage } = APPLICATION_ANSWERS[answer]

    setSent({ applicationId: application.id, answer, hasGoneThrough: false })

    // Two handlers rather than a trailing catch, so a throw while reading again can never be
    // reported as a failed answer.
    const onAnswered = () => {
      toast.success(`${application.teamName}: ${answeredMessage}`)

      if (isMounted.current) setSent((current) => current && { ...current, hasGoneThrough: true })

      refresh()
    }

    const onFailed = (cause: unknown) => {
      toast.error(`${application.teamName}: ${toErrorMessage(cause, failedMessage)}`)

      if (isMounted.current) setSent(null)

      // A 400 or a 404 means the card was out of date: someone answered the application first, it
      // can no longer be accepted, or it is gone.
      if (cause instanceof ApiError && [400, 404].includes(cause.status)) refresh()
    }

    void updateLeagueTeamManagerApplication({ id: application.id, status }).then(
      onAnswered,
      onFailed,
    )
  }

  const answerButtonsFor: ApplicationAnswersState['answerButtonsFor'] = (application) => ({
    teamName: application.teamName,
    sending: sending?.applicationId === application.id ? sending.answer : null,
    isLocked: sending !== null,
    onAnswer: (answer) => {
      send(application, answer)
    },
  })

  return { answerButtonsFor }
}
