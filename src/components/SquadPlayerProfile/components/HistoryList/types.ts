/** What every row of a history list has, whether or not it has a crest. */
interface HistoryItemBase {
  /** What tells the row from the others; unique in the list. */
  key: string

  /** The row's headline, beside the crest when there is one. */
  title: string

  /** The line under the headline. */
  meta: string

  /** The line under `meta`, or `null` when the row has none. */
  detail: string | null

  /** The text at the right edge, or `null` when the row has none. */
  value: string | null

  /** The small line under the value, or `null` when the row has none. */
  note: string | null
}

/** A row that starts with a club's crest. */
export interface CrestedHistoryItem extends HistoryItemBase {
  /** This row shows a crest. */
  hasCrest: true

  /** The address of the club's crest, or `null` to show the football in its place. */
  logoUrl: string | null
}

/** A row with no crest at all: its text starts where a crest would. */
export interface PlainHistoryItem extends HistoryItemBase {
  /** This row shows no crest, not even the football. */
  hasCrest: false
}

/** One row of a history list, every text already written. */
export type HistoryItem = CrestedHistoryItem | PlainHistoryItem

/** What `HistoryList` is handed. */
export interface HistoryListProps {
  /** The rows, in the order to show them. */
  items: HistoryItem[]
}
