/** One saved situation as the list shows it. */
export interface SavedSituationView {
  /** The minute it takes effect at, by the number the API uses for it. */
  minuteAt: number

  /** The state of the score it is for, by the number the API uses for it. */
  situation: number

  /** Its name, the API's labels joined, for example `60 · Losing`. */
  label: string

  /** Whether it is the open situation. */
  isOpen: boolean
}

/** What `SavedSituations` is handed. */
export interface SavedSituationsProps {
  /** The saved situations, in the API's order. */
  items: SavedSituationView[]

  /** Whether the board refuses input, because a request is in flight or the data is read again. */
  isLocked: boolean

  /** Called with a situation when its Edit is pressed. */
  onEdit: (item: SavedSituationView) => void

  /** Called with a situation when its Delete is pressed. */
  onDelete: (item: SavedSituationView) => void
}
