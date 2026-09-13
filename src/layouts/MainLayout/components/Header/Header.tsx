import { GameworldSelect } from './components/GameworldSelect'
import { Logo } from './components/Logo'
import { SettingsMenu } from './components/SettingsMenu'
import { useHeader } from './useHeader'

import styles from './Header.module.scss'

/**
 * The layout's top bar: the brand, the signed-in user, and the actions to
 * switch gameworld, sign out, or open settings.
 *
 * @returns The rendered header.
 */
export function Header() {
  const { username, signOut } = useHeader()

  return (
    <header className={styles.header}>
      <Logo size="sm" />

      <div className="d-flex align-items-center g-20">
        <button type="button" className="btn" onClick={signOut}>
          Sign out
        </button>
        <span className={styles.username}>{username}</span>
        <GameworldSelect />
        <SettingsMenu />
      </div>
    </header>
  )
}
