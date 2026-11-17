import { useCallback, useId, useRef, useState } from 'react'
import { generatePath, useNavigate } from 'react-router'

import { ROUTES } from '@/constants/routes'
import { useDismissOnOutsidePress } from '@/hooks/useDismissOnOutsidePress'
import { useDrawer } from '@/hooks/useDrawer'
import { useMyLeagueTeams } from '@/hooks/useMyLeagueTeams'
import { useOpenPlayerProfile } from '@/hooks/useOpenPlayerProfile'
import { leagueTeamProfiles } from '@/store/leagueTeamProfiles'

import { INPUT_ID_SUFFIX, LISTBOX_ID_SUFFIX, MIN_TERM_LENGTH } from './constants'
import { useKeepActiveVisible, useLeagueSearchRead, useVisibleViewportHeight } from './hooks'
import {
  isCaretMove,
  toGroupHeadingId,
  toNextOptionIndex,
  toSearchGroups,
  toSearchStatus,
} from './utils'

import type { LeagueSearchPlayerItemDto } from '@/types/leagueSearchPlayerItemDto'
import type { LeagueSearchTeamItemDto } from '@/types/leagueSearchTeamItemDto'

import type { LeagueSearchState } from './types'

/**
 * Drives the league search: a combobox over two groups of options, players and teams, with
 * automatic suggestions and no automatic selection.
 *
 * - The search bar opens and closes through the shared drawer, so below the breakpoint where the
 *   CSS makes it a bar it takes focus on open, locks the page scroll, and closes on `Escape`, on
 *   navigation and when the screen grows past that breakpoint. While it is open, the visible
 *   viewport's height is kept on it, so a phone's keyboard does not hide the results.
 * - Typing shows the popup; so does ArrowDown, and so does pressing the input, or opening the bar,
 *   while a term of enough letters is kept. Mere focus does not. Alt+ArrowDown shows it without
 *   making an option active.
 * - The popup closes on `Escape`, when focus leaves the input, on a press outside, when the term
 *   is cleared, when the bar opens or closes, and when a result is picked.
 * - The arrow keys walk the options of both groups as one list and wrap; `Enter` picks the active
 *   one. Nothing is active until an arrow key moves to it, and the active option is dropped when
 *   the term or the options change, or when a key moves the caret (Home, End, Left, Right) or is
 *   Up or Down with a modifier held (Alt, Ctrl, Meta or Shift), which is left to the input. Alt
 *   with Down is the exception: it is handled before that test and shows the popup. The
 *   active option is scrolled into view inside the results, with its group's heading when it is
 *   the group's first. No key is handled while a composition is under way.
 * - While the answer to a term is read, the earlier options stay listed, and pickable, and the
 *   list is busy.
 * - `Escape` with the popup open closes only the popup. With it closed, it clears the term where
 *   the magnifier button is hidden, which is where the search is the inline field, and otherwise
 *   reaches the drawer, which closes the bar. The browser's own clearing of a search field on
 *   `Escape` is always cancelled.
 * - Picking a result closes the bar first, which moves focus to the magnifier button, and then
 *   opens the player's profile or goes to the team's Squad page, so the panel gives focus back to
 *   a control that is still there. A player with no club opens as a free agent. The term stays.
 * - Before going to a team's Squad page, the team's profile is handed to the shared profile
 *   store, with the league of the club the search is made for, so the page names the club at once
 *   and reads nothing.
 *
 * @param leagueTeamId The league team id of the club the search is made for.
 * @returns The ids, refs, text, groups and handlers the view renders from.
 */
export function useLeagueSearch(leagueTeamId: number): LeagueSearchState {
  const { openPlayerProfile } = useOpenPlayerProfile()
  const { teams } = useMyLeagueTeams()
  const navigate = useNavigate()

  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const {
    isOpen: isBarOpen,
    id: panelId,
    toggleRef,
    panelRef,
    toggle: toggleBar,
    close: closeBar,
  } = useDrawer({ initialFocusRef: inputRef })

  useVisibleViewportHeight(panelRef, isBarOpen)

  const baseId = useId()
  const inputId = `${baseId}-${INPUT_ID_SUFFIX}`
  const listboxId = `${baseId}-${LISTBOX_ID_SUFFIX}`

  const [term, setTerm] = useState('')
  const [isListOpen, setIsListOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [seenBarOpen, setSeenBarOpen] = useState(isBarOpen)

  const trimmedTerm = term.trim()
  const isSearchable = trimmedTerm.length >= MIN_TERM_LENGTH

  const read = useLeagueSearchRead(leagueTeamId, trimmedTerm)
  const shownResult = isSearchable ? (read?.result ?? null) : null

  const [seenResult, setSeenResult] = useState(shownResult)

  // The bar opening or closing starts the popup over: it opens with a kept term of enough
  // letters, and closed otherwise. Adjusting state while rendering avoids an effect, which
  // oxlint's set-state-in-effect rule rejects.
  if (seenBarOpen !== isBarOpen) {
    setSeenBarOpen(isBarOpen)
    setIsListOpen(isBarOpen && isSearchable)
    setActiveIndex(-1)
  }

  // New options mean the active index points at something else.
  if (seenResult !== shownResult) {
    setSeenResult(shownResult)
    setActiveIndex(-1)
  }

  const groups = toSearchGroups(shownResult, listboxId)
  const options = groups.flatMap((group) => group.options)
  const status = toSearchStatus(trimmedTerm, read)

  const isPending = isSearchable && (read === null || !read.isCurrent)
  const isResultsOpen = isListOpen && trimmedTerm !== ''
  const isListExpanded = isResultsOpen && options.length > 0

  const activeOption = isListExpanded ? (options[activeIndex] ?? null) : null
  const activeId = activeOption?.id ?? null

  useKeepActiveVisible(scrollRef, activeId, toGroupHeadingId(groups, activeId))

  const closePopup = useCallback(() => {
    setIsListOpen(false)
    setActiveIndex(-1)
  }, [])

  useDismissOnOutsidePress(panelRef, isResultsOpen, closePopup)

  const onTermChange: LeagueSearchState['onTermChange'] = (event) => {
    setTerm(event.target.value)
    setIsListOpen(true)
    setActiveIndex(-1)
  }

  // Leaves the popup, and the bar if it is open, before the panel for the pick opens.
  const finishPick = () => {
    closePopup()

    if (isBarOpen) closeBar()
  }

  const onPickPlayer = (player: LeagueSearchPlayerItemDto) => {
    finishPick()

    openPlayerProfile({
      playerId: player.playerId,
      name: player.name,
      isFreeAgent: player.leagueTeamId === null,
    })
  }

  const onPickTeam = (team: LeagueSearchTeamItemDto) => {
    finishPick()

    // A search is scoped to the league of its club, so the picked team plays in that league.
    const anchor = teams.find((club) => club.leagueTeamId === leagueTeamId)

    if (anchor !== undefined) {
      leagueTeamProfiles.prime({
        leagueTeamId: team.leagueTeamId,
        leagueId: anchor.leagueId,
        leagueName: anchor.leagueName,
        teamName: team.teamName,
        teamLogoUrl: team.teamLogoUrl,
      })
    }

    void navigate(generatePath(ROUTES.myTeamSquad, { leagueTeamId: String(team.leagueTeamId) }))
  }

  const onKeyDown: LeagueSearchState['onKeyDown'] = (event) => {
    if (event.nativeEvent.isComposing) return

    // Alt+ArrowDown shows the popup, as a combobox's keys do; it moves neither caret nor option.
    if (event.key === 'ArrowDown' && event.altKey) {
      event.preventDefault()

      if (trimmedTerm !== '') setIsListOpen(true)

      return
    }

    // The caret moves, or the key is a modified arrow, so no option stays active; the key itself
    // is left to the input.
    if (isCaretMove(event)) {
      setActiveIndex(-1)

      return
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()

      if (isListExpanded) {
        const step = event.key === 'ArrowDown' ? 1 : -1

        setActiveIndex(toNextOptionIndex(activeIndex, options.length, step))
      } else if (!isResultsOpen && trimmedTerm !== '') {
        setIsListOpen(true)
      }

      return
    }

    if (event.key === 'Enter') {
      if (activeOption?.kind === 'player') onPickPlayer(activeOption.player)

      if (activeOption?.kind === 'team') onPickTeam(activeOption.team)

      return
    }

    if (event.key !== 'Escape') return

    // The browser would also clear a search field on Escape, whatever the popup is doing.
    event.preventDefault()

    if (isResultsOpen) {
      event.stopPropagation()
      closePopup()

      return
    }

    // With the magnifier hidden the search is the inline field, where Escape clears the term.
    // Otherwise the event goes on to the drawer, which closes the bar.
    const isInline = toggleRef.current?.getClientRects().length === 0

    if (isInline && term !== '') {
      event.stopPropagation()
      setTerm('')
    }
  }

  const onInputClick = () => {
    if (isSearchable) setIsListOpen(true)
  }

  const onResultsMouseDown: LeagueSearchState['onResultsMouseDown'] = (event) => {
    event.preventDefault()
  }

  return {
    panelId,
    inputId,
    listboxId,
    toggleRef,
    panelRef,
    inputRef,
    scrollRef,
    isBarOpen,
    term,
    isResultsOpen,
    isListExpanded,
    isBusy: isPending && options.length > 0,
    groups,
    activeId,
    status,
    toggleBar,
    closeBar,
    onTermChange,
    onKeyDown,
    onInputClick,
    onBlur: closePopup,
    onResultsMouseDown,
    onPickPlayer,
    onPickTeam,
  }
}
