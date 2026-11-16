import { useState } from 'react'

import type { FieldErrorsState } from '../types'

/**
 * Keeps why each field of a form is not valid.
 *
 * @template TErrors The form's errors: one message, or `null`, for each of its fields.
 * @param noErrors The errors of a form with nothing wrong, which the hook starts from.
 * @returns The errors, what replaces them all, and what drops the error of one field.
 */
export function useFieldErrors<TErrors extends Record<keyof TErrors, string | null>>(
  noErrors: TErrors,
): FieldErrorsState<TErrors> {
  const [errors, setErrors] = useState(noErrors)

  const clearError = (field: keyof TErrors) => {
    setErrors((current) => ({ ...current, [field]: null }))
  }

  return { errors, setErrors, clearError }
}
