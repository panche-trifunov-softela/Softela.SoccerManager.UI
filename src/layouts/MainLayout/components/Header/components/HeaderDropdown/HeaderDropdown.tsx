import { ITEM_ROLE } from './constants'
import { useHeaderDropdown } from './useHeaderDropdown'

import styles from './HeaderDropdown.module.scss'

import type { HeaderDropdownProps } from './types'

/**
 * Trigger button that reveals a list of entries below it; a press outside the
 * component or `Escape` dismisses the list.
 *
 * @param props The component's props.
 * @returns The rendered trigger and, when open, its list.
 */
export function HeaderDropdown({ trigger, ariaLabel, items, selectedId, role, onSelect }: HeaderDropdownProps) {
  const { isOpen, containerRef, toggle, select } = useHeaderDropdown(onSelect)

  return (
    <div ref={containerRef} className={styles.dropdown}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup={role}
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        onClick={toggle}
      >
        {trigger}
      </button>

      {isOpen && (
        <ul role={role} className={styles.menu}>
          {items.map((item) => (
            <li key={item.id} role="none">
              <button
                type="button"
                role={ITEM_ROLE[role]}
                aria-selected={role === 'listbox' ? item.id === selectedId : undefined}
                className={item.id === selectedId ? `${styles.item} ${styles['item--active']}` : styles.item}
                onClick={() => select(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
