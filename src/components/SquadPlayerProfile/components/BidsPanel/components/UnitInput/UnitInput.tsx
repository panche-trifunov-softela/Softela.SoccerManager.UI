import { toFieldClass } from '../../utils'

import { toInputAttributes } from './utils'

import styles from './UnitInput.module.scss'

import type { UnitInputProps } from './types'

/**
 * A text input for a number, with its unit drawn inside the field at its start, such as a
 * currency sign. The unit is decoration and is hidden from assistive technology, and the label
 * names what the number is and its unit.
 *
 * @param props The field to show, the unit and the placeholder.
 * @returns The rendered input with its unit. A field that cannot be edited renders a read-only
 * input in the page's own background, so it reads as not editable.
 */
export function UnitInput({ field, unit, placeholder }: UnitInputProps) {
  const { isReadOnly, isInvalid, onChange, onFocus, onBlur } = toInputAttributes(field)

  return (
    <div className="field-wrapper d-flex">
      <input
        id={field.id}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        readOnly={isReadOnly}
        className={`${toFieldClass(isInvalid)} ${styles.input}`}
        value={field.value}
        placeholder={placeholder}
        aria-invalid={isInvalid || undefined}
        aria-describedby={field.messageId ?? undefined}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      <span aria-hidden="true" className={styles.unit}>
        {unit}
      </span>
    </div>
  )
}
