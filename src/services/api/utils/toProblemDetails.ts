import type { ProblemDetails } from '@/types/problemDetails'

/**
 * Reads the problem body of a failed response.
 *
 * A rejected bearer token never reaches the exception middleware, so a 401
 * arrives with no body at all — and a proxy or gateway can answer with HTML.
 * Both come back as `null` rather than throwing while handling an error.
 *
 * @param response The failed response.
 * @returns The parsed problem body, or `null` when there was not one.
 */
export async function toProblemDetails(response: Response): Promise<ProblemDetails | null> {
  if (!response.headers.get('content-type')?.includes('json')) return null

  try {
    return (await response.json()) as ProblemDetails
  } catch {
    return null
  }
}
