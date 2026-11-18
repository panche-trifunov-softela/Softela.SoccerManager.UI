import type { AnswerChoice } from '@/types/answerChoice'

/** What `AnswerButtons` is handed. */
export interface AnswerButtonsProps {
  /**
   * The phrase naming what is answered, which the buttons' accessible names carry, such as
   * `Jane Doe's application for Bayer Leverkusen`.
   */
  subjectName: string

  /** The answer under way from these buttons, or `null` when there is none; its button says so. */
  sending: AnswerChoice | null

  /** Whether both buttons refuse clicks, while an answer from the same list is still under way. */
  isLocked: boolean

  /** Called with the answer the reader pressed. */
  onAnswer: (answer: AnswerChoice) => void
}
