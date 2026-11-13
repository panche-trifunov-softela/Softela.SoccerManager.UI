import { useTabs } from './useTabs'

import styles from './Tabs.module.scss'

import type { TabsProps } from './types'

/**
 * A strip of tabs with one panel each, following the WAI-ARIA tabs pattern with automatic
 * activation: moving to a tab with the arrow keys selects it.
 *
 * - At least one tab is assumed; the first starts selected.
 * - A panel's content renders only once its tab was first selected, then stays mounted, so
 *   anything it reads runs once and switching back never reads again. Every panel element is
 *   always rendered and is `hidden` unless its tab is selected.
 *
 * @param props The strip's accessible name and the tabs, each with the panel it shows.
 * @returns The rendered tab strip and panels.
 */
export function Tabs({ label, tabs }: TabsProps) {
  const { baseId, selectedId, visitedIds, select, setTabElement, onKeyDown } = useTabs(tabs)

  return (
    <div>
      <div role="tablist" aria-label={label} className={styles.strip}>
        {tabs.map((tab, index) => {
          const isSelected = tab.id === selectedId

          return (
            <button
              key={tab.id}
              ref={(element) => {
                setTabElement(tab.id, element)
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={isSelected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={isSelected ? 0 : -1}
              className={`${styles.tab} focus-ring`}
              onClick={() => {
                select(tab.id)
              }}
              onKeyDown={(event) => {
                onKeyDown(event, index)
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          tabIndex={0}
          hidden={tab.id !== selectedId}
          className={styles.panel}
        >
          {visitedIds.includes(tab.id) && tab.panel}
        </div>
      ))}
    </div>
  )
}
