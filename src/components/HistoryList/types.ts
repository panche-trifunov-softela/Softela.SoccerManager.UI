import type { ReactNode } from 'react'

/** What every row of a history list has, whether or not it has a crest. */
interface HistoryItemBase {
  /** What tells the row from the others; unique in the list. */
  key: string

  /** The row's headline, beside the crest and the photo when there are any. */
  title: string

  /** The line under the headline. */
  meta: string

  /**
   * The second line, or `null` when the row has none: under `meta` from md, under the value
   * below md.
   */
  detail: string | null

  /**
   * The text at the row's end from md, on its own line under `meta` below md, or `null` when the
   * row has none.
   */
  value: string | null

  /**
   * The small line under the value from md, beside it below md, or `null` when the row has none.
   */
  note: string | null
}

/** A row that starts with a club's crest. */
export interface CrestedHistoryItem extends HistoryItemBase {
  /** This row shows a crest. */
  hasCrest: true

  /** The address of the club's crest, or `null` to show the football in its place. */
  logoUrl: string | null

  /**
   * The address of the player's photo, drawn after the crest; `null` draws the person icon in its
   * place. Left out, the row has no photo.
   */
  photoUrl?: string | null
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

  /**
   * Draws what the reader can do with one row, below its text and value, or `undefined` for a
   * list whose rows have nothing to do. Called with the row's `key`; a row whose result is
   * `null`, `undefined` or `false` gets no actions line.
   */
  renderActions?: (key: string) => ReactNode

  /**
   * Opens what a row's title names, by the row's `key`. When set, each title is a button; when
   * not, a title is plain text.
   */
  onTitleClick?: (key: string) => void
}
