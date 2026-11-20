import type { PlayerSearchQuery } from './playerSearchQuery'

/** One finished read of a page of players, kept with the query it was made for. */
export interface PlayerSearchSettledRead<TResult> {
  /** The query the read was made for. */
  query: PlayerSearchQuery

  /** The page of players read, or `null` when the read failed. */
  result: TResult | null

  /** The fixed sentence that says the read failed, or `null` when it did not. */
  error: string | null
}

/** What `usePlayerSearchRead` exposes. */
export interface PlayerSearchReadState<TResult> {
  /**
   * The last finished read's page of players, or `null` before the first read and after a failed
   * one. While a read is in flight it is still the previous read's.
   */
  result: TResult | null

  /** Whether the read for the current query is still in flight. */
  isLoading: boolean

  /** The fixed sentence that says the last finished read failed, or `null` when it did not. */
  error: string | null
}
