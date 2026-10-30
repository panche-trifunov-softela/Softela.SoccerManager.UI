import { Outlet } from 'react-router'

import { OffCanvasHost } from '@/components/OffCanvasHost'

import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'

import styles from './MainLayout.module.scss'

/**
 * The shell every routed page renders inside: the header on top, then a row
 * with the club sidebar (on club pages) beside an outlet for the active page,
 * all wrapped in the host of the right off-canvas panel.
 *
 * @returns The rendered layout with the current route's page in its outlet.
 */
export function MainLayout() {
  return (
    <OffCanvasHost>
      <div className={styles.layout}>
        <Header />

        <div className={styles.body}>
          <Sidebar />

          <main className={`page_container ${styles.page}`}>
            <Outlet />
          </main>
        </div>
      </div>
    </OffCanvasHost>
  )
}
