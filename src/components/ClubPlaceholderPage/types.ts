/** What `ClubPlaceholderPage` is handed. */
export interface ClubPlaceholderPageProps {
  /** The page's heading. */
  title: string
}

/** What `useClubPlaceholderPage` hands the view. */
export interface ClubPlaceholderPageState {
  /** The club's name and game world, or `null` until the address's club is one the user runs. */
  subtitle: string | null
}
