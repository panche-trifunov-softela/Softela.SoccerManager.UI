import type { AnswerButtonsProps } from './types'

/**
 * The answers to one application: a green Accept button and a red Reject button.
 *
 * - The button whose answer is under way says so, in its text and in its accessible name.
 * - While any answer from the section is under way, both buttons refuse clicks.
 * - Both accessible names carry the club's name.
 *
 * @param props The club applied for, the answer under way from these buttons, whether they refuse
 * clicks, and what to call when one is pressed.
 * @returns The two buttons.
 */
export function AnswerButtons({ teamName, sending, isLocked, onAnswer }: AnswerButtonsProps) {
  return (
    <div className="d-flex g-8">
      <button
        type="button"
        className="btn btn--sm accept focus-ring"
        aria-label={
          sending === 'accept'
            ? `Accepting the application for ${teamName}`
            : `Accept the application for ${teamName}`
        }
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
        aria-label={
          sending === 'reject'
            ? `Rejecting the application for ${teamName}`
            : `Reject the application for ${teamName}`
        }
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
