import type { AnswerButtonsProps } from '@/components/AnswerButtons'
import type { ApplicationStatus } from '@/types/applicationStatus'
import type { IncomingLeagueTeamManagerApplicationDto } from '@/types/incomingLeagueTeamManagerApplicationDto'

/** One finished read of the applications made for clubs in the signed-in manager's leagues. */
export interface LeagueApplicationsRead {
  /** The applications the API returned, or none when the read failed. */
  applications: readonly IncomingLeagueTeamManagerApplicationDto[]

  /** The fixed line for a failed read, or `null` when it succeeded. */
  error: string | null
}

/**
 * What `useLeagueApplications` exposes to the view: the finished read, whether to hide it, and what
 * reads it again.
 */
export interface LeagueApplicationsState extends LeagueApplicationsRead {
  /** Whether the read is still in flight, or succeeded and found nothing. */
  isHidden: boolean

  /** Reads the applications again, keeping the cards on screen until the new ones land. */
  refresh: () => void
}

/** How one answer is sent, and how a toast puts its outcome into words. */
export interface ApplicationAnswerSpec {
  /** The status the API is sent for the answer. */
  status: ApplicationStatus

  /** What shows, after the club's name, when the answer went through. */
  answeredMessage: string

  /**
   * The sentence a toast shows, after the club's name, when the failure itself says nothing more;
   * it is the fallback of `toErrorMessage`.
   */
  failedMessage: string
}

/** What `useApplicationAnswers` exposes to the view. */
export interface ApplicationAnswersState {
  /**
   * The props of one application's answer buttons: the phrase naming the application, the answer
   * under way from them, whether they refuse clicks, and what answering does.
   */
  answerButtonsFor: (application: IncomingLeagueTeamManagerApplicationDto) => AnswerButtonsProps
}
