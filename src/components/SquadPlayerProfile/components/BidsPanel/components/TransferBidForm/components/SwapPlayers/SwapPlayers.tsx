import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { BidField } from '@/components/SquadPlayerProfile/components/BidsPanel/components/BidField'
import { BidSelect } from '@/components/SquadPlayerProfile/components/BidsPanel/components/BidSelect'

import { ADD_SWAP_LABEL } from '../../constants'

import styles from './SwapPlayers.module.scss'

import type { SwapPlayersProps } from './types'

/**
 * The swap player rows of a transfer bid form, as items of the form's grid, and the button that
 * adds one.
 *
 * @param props The rows, the add button, and what a screen reader is told after a removal.
 * @returns A labelled select with a remove button for each row, then the add button with the
 * reason it cannot add when there is one, then a status line, hidden from the eye, that says which
 * row was removed.
 */
export function SwapPlayers({ rows, add, removedMessage }: SwapPlayersProps) {
  return (
    <>
      {rows.map(({ label, field, options, removeLabel, onRemove }) => (
        <BidField
          key={field.id}
          id={field.id}
          label={label}
          message={field.message}
          messageId={field.messageId}
        >
          <div className="d-flex g-8">
            <BidSelect field={field} options={options} />

            <button
              type="button"
              className="btn btn--outlined btn--square focus-ring"
              aria-label={removeLabel}
              onClick={onRemove}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </BidField>
      ))}

      {add !== null && (
        <div className={`d-flex flex-column align-items-start g-6 ${styles.add}`}>
          <button
            type="button"
            id={add.id}
            className="btn btn--outlined focus-ring g-8"
            aria-disabled={!add.canAdd}
            aria-describedby={add.hintId ?? undefined}
            onClick={add.onAdd}
          >
            <FontAwesomeIcon icon={faPlus} />
            {ADD_SWAP_LABEL}
          </button>

          {add.hint !== null && (
            <p id={add.hintId ?? undefined} className="text-12">
              {add.hint}
            </p>
          )}
        </div>
      )}

      <p role="status" className="visually-hidden">
        {removedMessage}
      </p>
    </>
  )
}
