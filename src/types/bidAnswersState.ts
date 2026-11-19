import type { AnswerButtonsProps } from '@/components/AnswerButtons'

/** What `useBidAnswers` exposes. */
export interface BidAnswersState {
  /**
   * The props of the answer buttons of the row with the given key: the phrase naming the bid, the
   * answer under way from them, whether they refuse clicks, and what answering does. `null` when
   * no bid has that key.
   */
  answerButtonsFor: (key: string) => AnswerButtonsProps | null
}
