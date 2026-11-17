import { FREE_AGENT_LABEL } from '@/constants/freeAgent'

import type { LeagueSearchGroupView } from './types'

/** How many characters, once trimmed, a term needs before the search is made. */
export const MIN_TERM_LENGTH = 2

/** How long typing must pause, in milliseconds, before the search is made. */
export const SEARCH_DELAY_MS = 300

/** The longest term the input takes, and the longest the API accepts. */
export const SEARCH_TERM_MAX_LENGTH = 100

/** The input's accessible name, the search region's, and the magnifier button's. */
export const SEARCH_LABEL = 'Search players and teams'

/** What the input shows while it is empty; a part of its accessible name. */
export const SEARCH_PLACEHOLDER = 'Players and teams'

/** The accessible name of the button that closes the search bar on a narrow screen. */
export const CLOSE_SEARCH_LABEL = 'Close search'

/** The accessible name of the list of results. */
export const RESULTS_LABEL = 'Search results'

/** The heading, and the accessible name, of the group of players. */
export const PLAYERS_HEADING = 'Players'

/** The heading, and the accessible name, of the group of teams. */
export const TEAMS_HEADING = 'Teams'

/** What the popup says while the term is too short to search for. */
export const TERM_TOO_SHORT_MESSAGE = `Type at least ${MIN_TERM_LENGTH} characters.`

/** What the popup says while there is nothing earlier to show and the search is being read. */
export const SEARCHING_MESSAGE = 'Searching…'

/** What the popup says when the read failed and the API gave no better reason. */
export const SEARCH_FAILED_MESSAGE = 'Search results could not be loaded.'

/** What the popup adds under a list in which a group holds only the best matches. */
export const KEEP_TYPING_MESSAGE = 'Keep typing to narrow the list.'

/** The keys that move the caret in the input, and so leave no option active. */
export const CARET_KEYS: readonly string[] = ['Home', 'End', 'ArrowLeft', 'ArrowRight']

/**
 * The two arrow keys that walk the options when pressed alone, and are left to the input, like the
 * caret keys, when pressed with a modifier. Alt with Down is the exception: it shows the popup.
 */
export const VERTICAL_ARROW_KEYS: readonly string[] = ['ArrowUp', 'ArrowDown']

/** The name of the custom property that carries the visible viewport's height onto the bar. */
export const VIEWPORT_HEIGHT_PROPERTY = '--search-viewport-height'

/** Ends the id of the text input. */
export const INPUT_ID_SUFFIX = 'input'

/** Ends the id of the list of options. */
export const LISTBOX_ID_SUFFIX = 'list'

/** Ends the id of a player's option, before the player's id. */
export const PLAYER_OPTION_ID_SUFFIX = 'player'

/** Ends the id of a team's option, before the league team's id. */
export const TEAM_OPTION_ID_SUFFIX = 'team'

/** Ends the id of the players group's heading. */
export const PLAYERS_HEADING_ID_SUFFIX = 'players-heading'

/** Ends the id of the teams group's heading. */
export const TEAMS_HEADING_ID_SUFFIX = 'teams-heading'

/** The groups listed while there are none to list; one array, so nothing re-renders for it. */
export const NO_GROUPS: readonly LeagueSearchGroupView[] = []

/** The singular noun for a player, in the sentences that count what was found. */
export const PLAYER_NOUN = 'player'

/** The singular noun for a team, in the sentences that count what was found. */
export const TEAM_NOUN = 'team'

/** What the plural of a noun adds to it. */
export const PLURAL_SUFFIX = 's'

/** Sits between how many are listed and how many matched in all, for example `5 of 37`. */
export const OF_JOINER = ' of '

/** Sits between the counts of two groups in one sentence. */
export const AND_JOINER = ' and '

/** Starts the sentence that says how many matches are listed when a group is cut. */
export const SHOWING_PREFIX = 'Showing '

/** Ends the sentence that says how many matches were found when no group is cut. */
export const FOUND_SUFFIX = ' found.'

/** Starts the sentence that says nothing matches, before the term. */
export const NO_MATCH_PREFIX = 'No players or teams match “'

/** Ends the sentence that says nothing matches, after the term. */
export const NO_MATCH_SUFFIX = '”.'

/** Separates the parts of an option's accessible name. */
export const LABEL_SEPARATOR = ', '

/** Starts the part of a player's accessible name that gives the rating, before the number. */
export const RATING_LABEL_PREFIX = 'rating '

/** The part of a player's accessible name that says the player has no rating. */
export const NO_RATING_LABEL = 'no rating'

/**
 * The part of a free agent's accessible name where the club would be: the shared label,
 * lower-cased to sit inside the sentence.
 */
export const FREE_AGENT_OPTION_LABEL = FREE_AGENT_LABEL.toLowerCase()

/** The part of a team's accessible name that tells it from a player's club. */
export const TEAM_LABEL = 'team'
