/** What `PageTitle` is handed. */
export interface PageTitleProps {
  /** The page's heading. */
  title: string

  /** A line under the heading, or `null` when there is none yet. */
  subtitle?: string | null

  /** Where the back arrow leads. */
  backTo: string

  /** What the back arrow announces, for example `Back to my teams`. */
  backLabel: string
}
