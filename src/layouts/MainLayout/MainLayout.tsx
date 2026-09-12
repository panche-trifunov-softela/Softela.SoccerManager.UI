import { NavLink, Outlet } from 'react-router'

import { useAuth } from '@/hooks/useAuth'

import { NAV_ITEMS } from './constants'

/**
 * The shell every routed page renders inside: a navigation built from
 * `NAV_ITEMS`, the signed-in user with a way to sign out, and an outlet for
 * the active page.
 *
 * @returns The rendered layout with the current route's page in its outlet.
 */
export function MainLayout() {
  const { user, logout } = useAuth()

  return (
    <>
      <header>
        <nav>
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.path} to={item.path} end>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div>
          <span>{user?.username}</span>
          <button type="button" onClick={() => void logout()}>
            Sign out
          </button>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  )
}
