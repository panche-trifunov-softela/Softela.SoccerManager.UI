import type { AnswerChoice } from './answerChoice'

/** The two sentences a toast says about one answer, after the item's prefix. */
export interface AnswerFlowMessages {
  /** What shows when the answer went through. */
  answeredMessage: string

  /**
   * The sentence a toast shows when the failure itself says nothing more; it is the fallback of
   * `toErrorMessage`.
   */
  failedMessage: string
}

/** The answer under way: which item it is for and what was answered. */
export interface AnswerSending {
  /** The key of the item answered. */
  key: string

  /** The answer sent. */
  choice: AnswerChoice
}

/** An answer sent from a list, kept while it is under way. */
export interface SentAnswer extends AnswerSending {
  /** Whether the API took the answer, so only reading the list again is left. */
  hasGoneThrough: boolean
}

/**
 * What `useAnswerFlow` is handed.
 *
 * @template TItem One listed item.
 */
export interface AnswerFlowOptions<TItem> {
  /** The items the list shows now. */
  items: readonly TItem[]

  /** Tells an item from the others in the list; unique among them. */
  toKey: (item: TItem) => string

  /** Sends the answer for one item; rejects when the API refuses or cannot be reached. */
  send: (item: TItem, choice: AnswerChoice) => Promise<unknown>

  /** Says how a toast puts the outcome of one answer into words. */
  toMessages: (item: TItem, choice: AnswerChoice) => AnswerFlowMessages

  /** Writes what a toast about one item starts with, before the colon. */
  toToastPrefix: (item: TItem) => string

  /** Reads the list again. */
  refresh: () => void
}

/**
 * What `useAnswerFlow` exposes.
 *
 * @template TItem One listed item.
 */
export interface AnswerFlowState<TItem> {
  /** The answer holding the list back, or `null` when none does. */
  sending: AnswerSending | null

  /** Whether an answer holds the list back, so every answer refuses clicks. */
  isLocked: boolean

  /** Answers one item; does nothing while an answer holds the list back. */
  answer: (item: TItem, choice: AnswerChoice) => void
}
