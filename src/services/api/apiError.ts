import { readValidationErrors } from './utils'

import type { ProblemDetails } from '@/types/problemDetails'

/** An error status from the API, carrying whatever it said about the failure. */
export class ApiError extends Error {
  /** The HTTP status code. */
  readonly status: number

  /** The parsed problem body, or `null` when the response carried none. */
  readonly problem: ProblemDetails | null

  /**
   * Failure messages keyed by property, or `null` when this was not a
   * validation failure.
   */
  readonly validationErrors: Record<string, string[]> | null

  /**
   * Builds the error from a failed response's status and body.
   *
   * @param status The HTTP status code the API returned.
   * @param problem The parsed problem body, or `null` when there was none.
   */
  constructor(status: number, problem: ProblemDetails | null) {
    super(problem?.title ?? `Request failed with status ${status}.`)

    this.name = 'ApiError'
    this.status = status
    this.problem = problem
    this.validationErrors = readValidationErrors(problem)
  }
}
