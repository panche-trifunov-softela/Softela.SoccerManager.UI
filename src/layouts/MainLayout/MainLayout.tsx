import { NavLink, Outlet } from 'react-router'

import { NAV_ITEMS } from './constants'

/**
 * The shell every routed page renders inside: a navigation built from
 * `NAV_ITEMS` and an outlet for the active page.
 *
 * @returns The rendered layout with the current route's page in its outlet.
 */
export function MainLayout() {
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
      </header>

      <main>
        <Outlet />
      </main>
    </>
  )
}
