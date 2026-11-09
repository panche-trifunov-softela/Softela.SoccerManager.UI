import { TEAM_INSTRUCTIONS_TITLE } from './constants'

import styles from './TeamInstructions.module.scss'

import type { TeamInstructionsProps } from './types'

/**
 * The team instructions under the bench: a titled card with one select for each instruction the
 * API offers, in its order, laid out by breakpoint.
 *
 * - Below sm: one select to a row.
 * - From sm up to md: two to a row.
 * - From md up to lg: three to a row.
 * - From lg: two to a row again, as the card then sits in the board's 560px column.
 * - A wide select takes a whole row at every width.
 * - While the board is locked every select is `aria-disabled` rather than `disabled`, so the one
 *   that was changed keeps focus; the editor refuses the change, and the select keeps showing the
 *   instruction as the server last said it.
 *
 * @param props The selects to show, the instructions' values, whether the board is locked, and
 * what to call on a change.
 * @returns The rendered card.
 */
export function TeamInstructions({
  controls,
  values,
  isLocked,
  onChange,
}: TeamInstructionsProps) {
  return (
    <section
      aria-label={TEAM_INSTRUCTIONS_TITLE}
      className="card card-padded d-flex flex-column g-16"
    >
      <h2 className="label h6">{TEAM_INSTRUCTIONS_TITLE}</h2>

      <div className={styles.controls}>
        {controls.map(({ field, label, options, isWide }) => (
          <label
            key={field}
            className={`d-flex flex-column g-6${isWide ? ` ${styles.wide}` : ''}`}
          >
            <span className="label text-10">{label}</span>

            <select
              className="field"
              value={values[field]}
              aria-disabled={isLocked}
              onChange={(event) => {
                onChange(field, Number(event.target.value))
              }}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </section>
  )
}
