/** What `useAddTeam` exposes to the page. */
export interface AddTeamState {
  /** The search the leagues are listed by, or `null` when there is none. */
  searchTerm: string | null

  /** Submits a new search; a blank one lists the newest leagues again. */
  search: (value: string) => void
}
