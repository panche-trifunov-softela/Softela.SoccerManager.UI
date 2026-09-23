/**
 * RFC 7807 problem details, as the API's exception-handling middleware writes
 * them. Every member is optional: the middleware sets only what it has, and a
 * failure raised before it — a rejected bearer token, for instance — carries
 * no body at all.
 */
export interface ProblemDetails {
  /** URI identifying the problem type. */
  type?: string

  /** Short summary, such as `Resource not found`. */
  title?: string

  /** The status code, repeated inside the body. */
  status?: number

  /** Explanation specific to this occurrence. */
  detail?: string

  /** URI identifying this occurrence. */
  instance?: string
}

/**
 * The 400 the validation pipeline returns: problem details carrying every
 * failure it raised.
 */
export interface ValidationProblemDetails extends ProblemDetails {
  /** Failure messages, keyed by the property that failed. */
  errors: Record<string, string[]>
}
