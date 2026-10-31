/** An answer to an application: accepting it or rejecting it. */
export type ApplicationAnswer = 'accept' | 'reject'

/** What `AnswerButtons` is handed. */
export interface AnswerButtonsProps {
  /**
   * The phrase naming the application answered, which the buttons' accessible names carry, such as
   * `Jane Doe's application for Bayer Leverkusen`.
   */
  applicationName: string

  /** The answer under way from these buttons, or `null` when there is none; its button says so. */
  sending: ApplicationAnswer | null

  /** Whether both buttons refuse clicks, while an answer from the section is still under way. */
  isLocked: boolean

  /** Called with the answer the reader pressed. */
  onAnswer: (answer: ApplicationAnswer) => void
}
