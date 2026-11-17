import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router'

import { ROUTES } from '@/constants/routes'

import { LeagueSearch } from './components/LeagueSearch'
import { LeagueSelect } from './components/LeagueSelect'
import { Logo } from './components/Logo'
import { MenuToggle } from './components/MenuToggle'
import { SettingsMenu } from './components/SettingsMenu'
import { useHeader } from './useHeader'

import styles from './Header.module.scss'

/**
 * The layout's top bar: the brand, the league search of the selected club when there is one,
 * and the user's actions, inline from the md breakpoint and in a slide-in drawer behind a burger
 * below it.
 *
 * @returns The rendered header.
 */
export function Header() {
  const {
    username,
    selectedClubId,
    signOut,
    isMenuOpen,
    menuId,
    toggleRef,
    menuRef,
    closeButtonRef,
    toggleMenu,
    closeMenu,
  } = useHeader()

  const backdropClass = isMenuOpen
    ? 'drawer-backdrop drawer-backdrop--below-md drawer-backdrop--open'
    : 'drawer-backdrop drawer-backdrop--below-md'

  const menuClass = isMenuOpen
    ? `drawer drawer--below-md drawer--open ${styles.menu}`
    : `drawer drawer--below-md ${styles.menu}`

  return (
    <header className={styles.header}>
      <Logo size="sm" />

      {selectedClubId !== null && <LeagueSearch key={selectedClubId} leagueTeamId={selectedClubId} />}

      <MenuToggle ref={toggleRef} isOpen={isMenuOpen} controls={menuId} onToggle={toggleMenu} />

      <div aria-hidden="true" className={backdropClass} onClick={closeMenu} />

      <div id={menuId} ref={menuRef} className={menuClass}>
        <div className={styles.menu_header}>
          <span className={`text-overflow ${styles.username}`}>{username}</span>

          <button
            ref={closeButtonRef}
            type="button"
            className={`close-btn focus-ring ${styles.close}`}
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <LeagueSelect />

        <NavLink to={ROUTES.ratings} className={`focus-ring ${styles.link}`}>
          Ratings
        </NavLink>

        <button type="button" className={`btn focus-ring ${styles.sign_out}`} onClick={signOut}>
          Sign out
        </button>

        <SettingsMenu />
      </div>
    </header>
  )
}
