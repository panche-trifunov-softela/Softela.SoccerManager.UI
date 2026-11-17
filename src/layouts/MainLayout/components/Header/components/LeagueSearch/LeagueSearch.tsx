import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { PlayerOption } from './components/PlayerOption'
import { SearchGroup } from './components/SearchGroup'
import { TeamOption } from './components/TeamOption'
import {
  CLOSE_SEARCH_LABEL,
  RESULTS_LABEL,
  SEARCH_LABEL,
  SEARCH_PLACEHOLDER,
  SEARCH_TERM_MAX_LENGTH,
} from './constants'
import { useLeagueSearch } from './useLeagueSearch'

import styles from './LeagueSearch.module.scss'

import type { LeagueSearchProps } from './types'

/**
 * The header's search for the selected club: a combobox that lists the league's players and
 * teams matching what is typed, in two groups, and opens the chosen player's profile or team's
 * squad.
 *
 * - From the lg breakpoint it is a field in the header, with the results in a popover under it.
 * - Below it, a magnifier button opens the field as a bar across the top of the screen, over a
 *   dimmed page, with the results hanging under it.
 * - The results are a listbox of two groups, Players and Teams. A line of text, such as that the
 *   term is too short, and the footer that asks for a longer term, sit beside the listbox, not
 *   in it.
 * - While an earlier answer is kept for a term being read, the popup is busy and dimmed.
 * - A live region always in the page announces the search's progress and outcome; the popup's
 *   own copy of that text is hidden from assistive technology.
 *
 * @param props The club the search is made for.
 * @returns The rendered search.
 */
export function LeagueSearch({ leagueTeamId }: LeagueSearchProps) {
  const {
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
    isBusy,
    groups,
    activeId,
    status,
    toggleBar,
    closeBar,
    onTermChange,
    onKeyDown,
    onInputClick,
    onBlur,
    onResultsMouseDown,
    onPickPlayer,
    onPickTeam,
  } = useLeagueSearch(leagueTeamId)

  const backdropClass = isBarOpen
    ? `drawer-backdrop drawer-backdrop--below-lg drawer-backdrop--open ${styles.backdrop}`
    : `drawer-backdrop drawer-backdrop--below-lg ${styles.backdrop}`

  const panelClass = isBarOpen
    ? `drawer drawer--below-lg drawer--open ${styles.panel}`
    : `drawer drawer--below-lg ${styles.panel}`

  const resultsClasses = [styles.results]

  if (isResultsOpen) resultsClasses.push(styles['results--open'])

  if (isBusy) resultsClasses.push(styles['results--busy'])

  return (
    <div className={styles.search}>
      <button
        ref={toggleRef}
        type="button"
        className={`focus-ring ${styles.toggle}`}
        aria-label={SEARCH_LABEL}
        aria-expanded={isBarOpen}
        aria-controls={panelId}
        onClick={toggleBar}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>

      <div aria-hidden="true" className={backdropClass} onClick={closeBar} />

      <div
        id={panelId}
        ref={panelRef}
        role="search"
        aria-label={SEARCH_LABEL}
        className={panelClass}
      >
        <div className={styles.bar}>
          <div className={`field-wrapper ${styles.field_box}`}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.field_icon} />

            <label htmlFor={inputId} className="visually-hidden">
              {SEARCH_LABEL}
            </label>

            <input
              ref={inputRef}
              id={inputId}
              type="search"
              role="combobox"
              className={`field focus-ring ${styles.input}`}
              value={term}
              placeholder={SEARCH_PLACEHOLDER}
              maxLength={SEARCH_TERM_MAX_LENGTH}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              aria-autocomplete="list"
              aria-expanded={isListExpanded}
              aria-controls={listboxId}
              aria-activedescendant={activeId ?? undefined}
              onChange={onTermChange}
              onKeyDown={onKeyDown}
              onClick={onInputClick}
              onBlur={onBlur}
            />
          </div>

          <button
            type="button"
            className={`close-btn focus-ring ${styles.close}`}
            aria-label={CLOSE_SEARCH_LABEL}
            onClick={closeBar}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div
          className={resultsClasses.join(' ')}
          aria-busy={isBusy}
          onMouseDown={onResultsMouseDown}
        >
          <div ref={scrollRef} className={styles.scroll}>
            <div
              id={listboxId}
              role="listbox"
              aria-label={RESULTS_LABEL}
              hidden={groups.length === 0}
            >
              {groups.map((group) => (
                <SearchGroup
                  key={group.key}
                  headingId={group.headingId}
                  heading={group.heading}
                  countText={group.countText}
                >
                  {group.options.map((option) =>
                    option.kind === 'player' ? (
                      <PlayerOption
                        key={option.id}
                        id={option.id}
                        player={option.player}
                        isActive={option.id === activeId}
                        onPick={onPickPlayer}
                      />
                    ) : (
                      <TeamOption
                        key={option.id}
                        id={option.id}
                        team={option.team}
                        isActive={option.id === activeId}
                        onPick={onPickTeam}
                      />
                    ),
                  )}
                </SearchGroup>
              ))}
            </div>

            {status.message !== null && (
              <p aria-hidden="true" className={`text-12 ${styles.message}`}>
                {status.message}
              </p>
            )}
          </div>

          {status.footer !== null && (
            <p aria-hidden="true" className={`text-12 ${styles.footer}`}>
              {status.footer}
            </p>
          )}
        </div>
      </div>

      <p role="status" className="visually-hidden">
        {status.announced}
      </p>
    </div>
  )
}
