import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router'

import { SIDEBAR_LABEL } from './constants'
import { useSidebar } from './useSidebar'

import styles from './Sidebar.module.scss'

/**
 * The club menu beside the page: an icon column below the lg breakpoint and a
 * full icon-and-label panel from it. It shows only on the pages of a club the
 * user manages.
 *
 * @returns The rendered sidebar, an empty placeholder column while the user's
 * clubs load, or nothing when no club is selected.
 */
export function Sidebar() {
  const { isVisible, items } = useSidebar()

  if (!isVisible) {
    return null
  }

  if (items.length === 0) {
    return <div className={styles.sidebar} />
  }

  return (
    <nav className={styles.sidebar} aria-label={SIDEBAR_LABEL}>
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
  )
}
