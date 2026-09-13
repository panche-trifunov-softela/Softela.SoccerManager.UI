/** What `useHeader` hands the view. */
export interface HeaderState {
  /** The signed-in user's name; empty when nobody is signed in. */
  username: string

  /** Ends the session. */
  signOut: () => void
}
