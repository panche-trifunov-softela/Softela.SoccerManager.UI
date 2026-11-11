import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router'

import { SIDEBAR_COLLAPSE_LABEL, SIDEBAR_EXPAND_LABEL, SIDEBAR_LABEL } from './constants'
import { useSidebar } from './useSidebar'

import styles from './Sidebar.module.scss'

/**
 * The club menu beside the page: an icon column below the lg breakpoint and a
 * full icon-and-label panel from it. It shows only on the pages of a club the
 * user manages. On phones a toggle at its top collapses it to a slim strip.
 *
 * @returns The rendered sidebar (with an empty column in place of its links while
 * the user's clubs load), or nothing when no club is selected.
 */
export function Sidebar() {
  const { isVisible, items, isCollapsed, navId, toggleCollapsed } = useSidebar()

  if (!isVisible) {
    return null
  }

  const toggleLabel = isCollapsed ? SIDEBAR_EXPAND_LABEL : SIDEBAR_COLLAPSE_LABEL

  return (
    <div className={isCollapsed ? `${styles.sidebar} ${styles['sidebar--collapsed']}` : styles.sidebar}>
      <button
        type="button"
        className={`${styles.toggle} focus-ring`}
        aria-expanded={!isCollapsed}
        aria-controls={navId}
        aria-label={toggleLabel}
        title={toggleLabel}
        onClick={toggleCollapsed}
      >
        <FontAwesomeIcon icon={isCollapsed ? faAnglesRight : faAnglesLeft} className={styles.icon} />
      </button>

      {items.length === 0 ? (
        <div id={navId} className={styles.nav} />
      ) : (
        <nav id={navId} className={styles.nav} aria-label={SIDEBAR_LABEL}>
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.label}>
                <NavLink to={item.to} className={`${styles.link} focus-ring`} title={item.label}>
                  <FontAwesomeIcon icon={item.icon} className={styles.icon} />

                  <span className={`h4 ${styles.label}`}>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
