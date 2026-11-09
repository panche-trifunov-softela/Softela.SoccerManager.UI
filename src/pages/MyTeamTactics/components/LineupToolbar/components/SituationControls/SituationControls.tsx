import { ADD_SITUATION_LABEL, CLOSE_SITUATION_LABEL } from './constants'

import styles from './SituationControls.module.scss'

import type { SituationControlsProps } from './types'

/**
 * A situation's controls: the button that opens one, or, while one is open, the dropdown for its
 * minute, the dropdown for its situation and the button that closes it.
 *
 * - Closed, it renders Add situation alone. The button is `disabled` when no situation can be
 *   opened.
 * - Open, it renders the two dropdowns and Close Situation as three sibling items, with no wrapper
 *   of their own.
 *   A minute option outside the club's window shows disabled.
 * - While the board is locked every control is `aria-disabled` rather than `disabled`, so the one
 *   that was pressed keeps focus; the editor refuses the input.
 *
 * @param props What is open, the choices of both dropdowns, whether the board is locked, and what
 * each control calls.
 * @returns The rendered controls.
 */
export function SituationControls({
  isOpen,
  canAdd,
  isLocked,
  minuteLabel,
  minuteOptions,
  minuteAt,
  situationLabel,
  situationOptions,
  situation,
  onAdd,
  onClose,
  onMinuteChange,
  onSituationChange,
}: SituationControlsProps) {
  if (!isOpen) {
    return (
      <button
        type="button"
        className="btn focus-ring"
        disabled={!canAdd}
        aria-disabled={isLocked}
        onClick={() => {
          onAdd()
        }}
      >
        {ADD_SITUATION_LABEL}
      </button>
    )
  }

  return (
    <>
      <label className={`d-flex flex-column g-6 ${styles.choice}`}>
        <span className="label text-10">{minuteLabel}</span>

        <select
          className="field"
          value={minuteAt ?? ''}
          aria-disabled={isLocked}
          onChange={(event) => {
            onMinuteChange(Number(event.target.value))
          }}
        >
          {minuteOptions.map(({ value, label, isDisabled }) => (
            <option key={value} value={value} disabled={isDisabled}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <label className={`d-flex flex-column g-6 ${styles.choice}`}>
        <span className="label text-10">{situationLabel}</span>

        <select
          className="field"
          value={situation ?? ''}
          aria-disabled={isLocked}
          onChange={(event) => {
            onSituationChange(Number(event.target.value))
          }}
        >
          {situationOptions.map(({ value, label, isDisabled }) => (
            <option key={value} value={value} disabled={isDisabled}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        className="btn focus-ring"
        aria-disabled={isLocked}
        onClick={() => {
          onClose()
        }}
      >
        {CLOSE_SITUATION_LABEL}
      </button>
    </>
  )
}
