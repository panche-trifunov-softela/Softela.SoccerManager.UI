import { LeagueSelect } from './components/LeagueSelect'
import { Logo } from './components/Logo'
import { MenuToggle } from './components/MenuToggle'
import { SettingsMenu } from './components/SettingsMenu'
import { useHeader } from './useHeader'

import styles from './Header.module.scss'

/**
 * The layout's top bar: the brand plus the user's actions, inline from the md
 * breakpoint and in a slide-in drawer behind a burger below it.
 *
 * @returns The rendered header.
 */
export function Header() {
  const { username, signOut, isMenuOpen, menuId, toggleRef, menuRef, closeButtonRef, toggleMenu, closeMenu } =
    useHeader()

  return (
    <header className={styles.header}>
      <Logo size="sm" />

      <MenuToggle ref={toggleRef} isOpen={isMenuOpen} controls={menuId} onToggle={toggleMenu} />

      <div
        aria-hidden="true"
        className={isMenuOpen ? `${styles.backdrop} ${styles['backdrop--open']}` : styles.backdrop}
        onClick={closeMenu}
      />

      <div
        id={menuId}
        ref={menuRef}
        className={isMenuOpen ? `${styles.menu} ${styles['menu--open']}` : styles.menu}
      >
        <div className={styles.menu_header}>
          <span className={`text-overflow ${styles.username}`}>{username}</span>

          <button
            ref={closeButtonRef}
            type="button"
            className={styles.close}
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <i className="icon-xmark" aria-hidden="true" />
          </button>
        </div>

        <LeagueSelect />

        <button type="button" className={`btn ${styles.sign_out}`} onClick={signOut}>
          Sign out
        </button>

        <SettingsMenu />
      </div>
    </header>
  )
}
