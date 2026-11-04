/**
 * One choice of an instruction: the number the API uses for it and the words that name it.
 *
 * Mirrors `InstructionOptionDto` on the backend.
 */
export interface InstructionOptionDto {
  /** The number the API sends and takes for the choice. */
  value: number

  /** What the choice is called on screen, for example `High press`. */
  label: string
}
