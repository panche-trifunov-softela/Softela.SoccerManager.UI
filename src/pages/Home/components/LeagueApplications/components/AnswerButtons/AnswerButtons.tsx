import type { AnswerButtonsProps } from './types'

/**
 * The answers to one application: a green Accept button and a red Reject button.
 *
 * - The button whose answer is under way says so, in its text and in its accessible name.
 * - While any answer from the section is under way, both buttons refuse clicks.
 * - Both accessible names carry the application's name, so two applicants for one club can be told
 *   apart.
 *
 * @param props The phrase naming the application, the answer under way from these buttons,
 * whether they refuse clicks, and what to call when one is pressed.
 * @returns The two buttons.
 */
export function AnswerButtons({
  applicationName,
  sending,
  isLocked,
  onAnswer,
}: AnswerButtonsProps) {
  return (
    <div className="d-flex g-8">
      <button
        type="button"
        className="btn btn--sm accept focus-ring"
        aria-label={
          sending === 'accept' ? `Accepting ${applicationName}` : `Accept ${applicationName}`
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
          sending === 'reject' ? `Rejecting ${applicationName}` : `Reject ${applicationName}`
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
