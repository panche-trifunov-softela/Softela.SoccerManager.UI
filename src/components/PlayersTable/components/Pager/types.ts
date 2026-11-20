/** What `Pager` is handed. */
export interface PagerProps {
  /** Where the reader is, for example `Page 2 of 272 · 6,781 players`. */
  summary: string

  /**
   * Whether there is a page before this one. When not, the button is `aria-disabled` and keeps
   * focus.
   */
  canGoBack: boolean

  /**
   * Whether there is a page after this one. When not, the button is `aria-disabled` and keeps
   * focus.
   */
  canGoForward: boolean

  /**
   * Called when the reader asks for the previous page. The caller ignores it when `canGoBack` is
   * false.
   */
  onPrevious: () => void

  /**
   * Called when the reader asks for the next page. The caller ignores it when `canGoForward` is
   * false.
   */
  onNext: () => void
}
