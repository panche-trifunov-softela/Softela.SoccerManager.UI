import type { ProblemDetails, ValidationProblemDetails } from '@/types/problemDetails'

/**
 * Reads the validation failures out of a problem body.
 *
 * @param problem The parsed problem body, or `null` when there was none.
 * @returns The failures keyed by property, or `null` when the body is not a
 * validation problem.
 */
export function readValidationErrors(
  problem: ProblemDetails | null,
): Record<string, string[]> | null {
  if (problem === null || !('errors' in problem)) return null

  const { errors } = problem as ValidationProblemDetails

  return typeof errors === 'object' && errors !== null ? errors : null
}
