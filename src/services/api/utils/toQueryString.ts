/**
 * Writes query parameters as a query string, leaving out the ones that are
 * undefined.
 *
 * @param params The parameters, by name.
 * @returns The query string with its leading `?`, or an empty string when no
 * parameter is set.
 */
export function toQueryString(
  params: Readonly<Record<string, string | number | boolean | undefined>>,
): string {
  const search = new URLSearchParams()

  for (const [name, value] of Object.entries(params)) {
    if (value !== undefined) search.set(name, String(value))
  }

  const query = search.toString()

  return query === '' ? '' : `?${query}`
}
