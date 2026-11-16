/**
 * Chooses the classes of a field's control.
 *
 * @param isInvalid Whether the field is not valid.
 * @returns The global field class, with its error modifier when the field is not valid.
 */
export function toFieldClass(isInvalid: boolean): string {
  return isInvalid ? 'field field--error' : 'field'
}
