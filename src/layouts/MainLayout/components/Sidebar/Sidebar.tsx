import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router'

import { SidebarGroup } from './components/SidebarGroup'
import { SIDEBAR_LABEL, SIDEBAR_TOGGLE_LABEL } from './constants'
import { useSidebar } from './useSidebar'

import styles from './Sidebar.module.scss'

/**
 * The club menu: one column of links in two looks. Below the lg breakpoint it is
 * a drawer over the page, opened by an edge tab, so it takes no room; from lg it
 * is the icon-and-label panel beside the page. It shows on the pages of any club,
 * listing the entries open to everyone, and the manager's own too on a club the
 * user runs. An entry is a link, or a group that opens a list of links.
 *
 * @returns The rendered sidebar (with an empty column in place of its links while
 * the user's clubs load), or nothing when the address names no club.
 */
export function Sidebar() {
  const { isVisible, items, isOpen, navId, toggleRef, rootRef, toggle, close } = useSidebar()

  if (!isVisible) {
    return null
  }

  const toggleClass = isOpen
    ? `${styles.toggle} ${styles['toggle--open']} focus-ring`
    : `${styles.toggle} focus-ring`

  const backdropClass = isOpen
    ? 'drawer-backdrop drawer-backdrop--below-lg drawer-backdrop--open'
    : 'drawer-backdrop drawer-backdrop--below-lg'

  const navClass = isOpen
    ? `drawer drawer--below-lg drawer--open ${styles.nav}`
    : `drawer drawer--below-lg ${styles.nav}`

  return (
    <div ref={rootRef} className={styles.sidebar}>
      {items.length === 0 ? (
        <div id={navId} className={navClass} />
      ) : (
        <>
          <button
            ref={toggleRef}
            type="button"
            className={toggleClass}
            aria-expanded={isOpen}
            aria-controls={navId}
            aria-label={SIDEBAR_TOGGLE_LABEL}
            title={SIDEBAR_TOGGLE_LABEL}
            onClick={toggle}
          >
            <FontAwesomeIcon icon={isOpen ? faAnglesLeft : faAnglesRight} />
          </button>

          <div aria-hidden="true" className={backdropClass} onClick={close} />

          <nav id={navId} className={navClass} aria-label={SIDEBAR_LABEL}>
            <ul className={styles.list}>
              {items.map((item) => (
                <li key={item.label}>
                  {item.kind === 'group' ? (
                    <SidebarGroup label={item.label} icon={item.icon} links={item.links} />
                  ) : (
                    <NavLink to={item.to} className={`${styles.link} focus-ring`}>
                      <FontAwesomeIcon icon={item.icon} className={styles.icon} />

                      <span className={`h4 ${styles.label}`}>{item.label}</span>
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  )
}
