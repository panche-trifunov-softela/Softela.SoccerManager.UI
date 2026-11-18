import type { AnswerButtonsProps } from './types'

/**
 * The answers to one item: a green Accept button and a red Reject button.
 *
 * - The button whose answer is under way says so, in its text and in its accessible name.
 * - While any answer from the same list is under way, both buttons refuse clicks.
 * - Both accessible names carry the subject's name, so two items in one list can be told apart.
 * - The buttons wrap onto a second line when the room is narrow.
 *
 * @param props The phrase naming the subject, the answer under way from these buttons, whether
 * they refuse clicks, and what to call when one is pressed.
 * @returns The two buttons.
 */
export function AnswerButtons({ subjectName, sending, isLocked, onAnswer }: AnswerButtonsProps) {
  return (
    <div className="d-flex flex-wrap g-8">
      <button
        type="button"
        className="btn btn--sm accept focus-ring"
        aria-label={sending === 'accept' ? `Accepting ${subjectName}` : `Accept ${subjectName}`}
        aria-disabled={isLocked}
        onClick={() => {
          onAnswer('accept')
        }}
      >
        {sending === 'accept' ? 'Accepting…' : 'Accept'}
      </button>

      <button
        type="button"
        className="btn btn--sm decline focus-ring"
        aria-label={sending === 'reject' ? `Rejecting ${subjectName}` : `Reject ${subjectName}`}
        aria-disabled={isLocked}
        onClick={() => {
          onAnswer('reject')
        }}
      >
        {sending === 'reject' ? 'Rejecting…' : 'Reject'}
      </button>
    </div>
  )
}
