/**
 * Works out the id of the line under a field's control.
 *
 * @param id The id of the field's control.
 * @returns The id of the line.
 */
export function toMessageId(id: string): string {
  return `${id}-message`
}
