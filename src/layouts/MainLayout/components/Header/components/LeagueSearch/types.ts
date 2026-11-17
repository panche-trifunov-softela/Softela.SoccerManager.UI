import type { ChangeEvent, KeyboardEvent, MouseEvent, RefObject } from 'react'

import type { LeagueSearchPlayerItemDto } from '@/types/leagueSearchPlayerItemDto'
import type { LeagueSearchResultDto } from '@/types/leagueSearchResultDto'
import type { LeagueSearchTeamItemDto } from '@/types/leagueSearchTeamItemDto'

/** Props of `LeagueSearch`. */
export interface LeagueSearchProps {
  /** The league team id of the club the search is made for, one the signed-in manager runs. */
  leagueTeamId: number
}

/** A finished search read, kept with the club it was made for. */
export interface LeagueSearchRead {
  /** The league team the read was made for. */
  leagueTeamId: number

  /**
   * Whether the read answers the term now typed. It stops doing so the moment the term changes,
   * so a read for a term that is typed again is not the answer until a newer read settles.
   */
  isCurrent: boolean

  /** What the search found, or `null` when it failed. */
  result: LeagueSearchResultDto | null

  /** The sentence that says why it failed, or `null` when it did not. */
  error: string | null
}

/** What the search says about itself, as text. */
export interface LeagueSearchStatus {
  /** The line the popup shows in place of a list, or `null` when it shows none. */
  message: string | null

  /** The line under the list, or `null` when there is none. */
  footer: string | null

  /** The sentence the live region announces; empty when there is nothing to announce. */
  announced: string
}

/** A key press, as far as the search needs to know of it. */
export interface LeagueSearchKeyPress {
  /** The value of the key pressed, for example `ArrowDown`. */
  key: string

  /** Whether Alt was held. */
  altKey: boolean

  /** Whether Ctrl was held. */
  ctrlKey: boolean

  /** Whether Meta was held. */
  metaKey: boolean

  /** Whether Shift was held. */
  shiftKey: boolean
}

/** One player's option, as the view draws it. */
export interface LeagueSearchPlayerOptionEntry {
  /** Tells a player's option from a team's. */
  kind: 'player'

  /** The element id of the option. */
  id: string

  /** The player the option stands for. */
  player: LeagueSearchPlayerItemDto
}

/** One team's option, as the view draws it. */
export interface LeagueSearchTeamOptionEntry {
  /** Tells a team's option from a player's. */
  kind: 'team'

  /** The element id of the option. */
  id: string

  /** The team the option stands for. */
  team: LeagueSearchTeamItemDto
}

/** One option of the popup, whichever kind of result it stands for. */
export type LeagueSearchOptionEntry = LeagueSearchPlayerOptionEntry | LeagueSearchTeamOptionEntry

/** One group of the popup, as the view draws it. */
export interface LeagueSearchGroupView {
  /** Which group this is. */
  key: 'players' | 'teams'

  /** The element id of the group's heading, which names the group. */
  headingId: string

  /** The group's heading text. */
  heading: string

  /** How many of how many matches are listed, or `null` when the group lists them all. */
  countText: string | null

  /** The group's options, best match first. */
  options: readonly LeagueSearchOptionEntry[]
}

/** What `useLeagueSearch` hands the view. */
export interface LeagueSearchState {
  /** The id of the search bar, referenced by the magnifier button. */
  panelId: string

  /** The id of the text input, referenced by its label. */
  inputId: string

  /** The id of the list of options, referenced by the input. */
  listboxId: string

  /** The magnifier button, which receives focus when the bar closes. */
  toggleRef: RefObject<HTMLButtonElement | null>

  /** The search bar and its results, outside of which a press or focus dismisses them. */
  panelRef: RefObject<HTMLDivElement | null>

  /** The text input, which receives focus when the bar opens. */
  inputRef: RefObject<HTMLInputElement | null>

  /** The scrolling area of the results, which keeps the active option in view. */
  scrollRef: RefObject<HTMLDivElement | null>

  /** Whether the search bar is open; it is only ever open on a narrow screen. */
  isBarOpen: boolean

  /** What is typed in the input. */
  term: string

  /** Whether the results popup is showing, with a list or with a line of text. */
  isResultsOpen: boolean

  /** Whether the popup is showing a list with at least one option in it. */
  isListExpanded: boolean

  /** Whether the list shown is an earlier answer, kept while the answer to the term is read. */
  isBusy: boolean

  /** The groups of options to choose from. */
  groups: readonly LeagueSearchGroupView[]

  /** The id of the option the arrow keys are on, or `null` when none is. */
  activeId: string | null

  /** What to tell the user about the search. */
  status: LeagueSearchStatus

  /** Opens the search bar when closed and closes it when open. */
  toggleBar: () => void

  /** Closes the search bar and returns focus to the magnifier button. */
  closeBar: () => void

  /** Takes what is typed, and shows the popup. */
  onTermChange: (event: ChangeEvent<HTMLInputElement>) => void

  /** Moves the active option, picks it, or closes the popup, by the key pressed. */
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void

  /** Shows the popup again when a term is kept and the input is pressed. */
  onInputClick: () => void

  /** Closes the popup when focus leaves the input. */
  onBlur: () => void

  /** Keeps focus in the input while the popup is pressed. */
  onResultsMouseDown: (event: MouseEvent<HTMLDivElement>) => void

  /** Opens the chosen player's profile and closes the popup. */
  onPickPlayer: (player: LeagueSearchPlayerItemDto) => void

  /** Opens the chosen team's Squad page and closes the popup. */
  onPickTeam: (team: LeagueSearchTeamItemDto) => void
}
