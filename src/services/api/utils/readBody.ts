/**
 * Reads a successful response's body.
 *
 * A `204`, and any other empty body, comes back as `undefined` rather than
 * failing to parse.
 *
 * @param response The successful response.
 * @returns The parsed body, or `undefined` when there was none.
 */
export async function readBody(response: Response): Promise<unknown> {
  if (response.status === 204) return undefined

  const text = await response.text()

  return text.length === 0 ? undefined : (JSON.parse(text) as unknown)
}
