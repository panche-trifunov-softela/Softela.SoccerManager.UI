import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router'

import { useSidebarGroup } from './useSidebarGroup'

import styles from './SidebarGroup.module.scss'

import type { SidebarGroupProps } from './types'

/**
 * A sidebar entry that opens a list of links. Its row only opens and closes the list, so it is a
 * button, not a link; the row looks current while the page is one of the links, and the link
 * itself carries `aria-current`.
 *
 * @param props The group's name, icon and links.
 * @returns The rendered row and its list of links, hidden while the list is closed.
 */
export function SidebarGroup({ label, icon, links }: SidebarGroupProps) {
  const { isOpen, isCurrent, listId, buttonRef, listRef, toggle } = useSidebarGroup(links)

  const rowClass = isCurrent
    ? `${styles.row} ${styles['row--current']} focus-ring`
    : `${styles.row} focus-ring`

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={rowClass}
        aria-expanded={isOpen}
        aria-controls={listId}
        onClick={toggle}
      >
        <FontAwesomeIcon icon={icon} className={styles.icon} />

        <span className={`h4 ${styles.label}`}>{label}</span>

        <FontAwesomeIcon icon={faChevronDown} className={styles.chevron} aria-hidden="true" />
      </button>

      <ul ref={listRef} id={listId} hidden={!isOpen} className={styles.links}>
        {links.map((link) => (
          <li key={link.to}>
            <NavLink to={link.to} className={`${styles.link} focus-ring`}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  )
}
