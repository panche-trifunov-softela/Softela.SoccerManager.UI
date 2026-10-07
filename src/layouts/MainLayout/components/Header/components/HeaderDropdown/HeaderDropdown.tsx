import { ITEM_ROLE } from './constants'
import { useHeaderDropdown } from './useHeaderDropdown'

import styles from './HeaderDropdown.module.scss'

import type { HeaderDropdownProps } from './types'

/**
 * List of entries that is a popover behind a trigger button from the md
 * breakpoint; below it the rows are either always shown inline, or, when
 * collapsible, expand under the trigger when pressed. A press outside the
 * component or `Escape` dismisses the list.
 *
 * @param props The component's props.
 * @returns The rendered heading, trigger and list.
 */
export function HeaderDropdown({
  trigger,
  ariaLabel,
  items,
  selectedId,
  role,
  heading,
  collapsible,
  onSelect,
}: HeaderDropdownProps) {
  const { isOpen, containerRef, triggerRef, headingId, toggle, select } = useHeaderDropdown(onSelect)

  return (
    <div
      ref={containerRef}
      className={collapsible ? `${styles.dropdown} ${styles['dropdown--collapsible']}` : styles.dropdown}
    >
      {heading && (
        <span id={headingId} className={`label ${styles.heading}`}>
          {heading}
        </span>
      )}

      <button
        ref={triggerRef}
        type="button"
        className={`focus-ring ${styles.trigger}`}
        aria-haspopup={role}
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        onClick={toggle}
      >
        {trigger}
      </button>

      <ul
        role={role}
        aria-labelledby={heading ? headingId : undefined}
        aria-label={heading ? undefined : ariaLabel}
        className={isOpen ? `${styles.menu} ${styles['menu--open']}` : styles.menu}
      >
        {items.map((item) => (
          <li key={item.id} role="none">
            <button
              type="button"
              role={ITEM_ROLE[role]}
              aria-selected={role === 'listbox' ? item.id === selectedId : undefined}
              className={
                item.id === selectedId
                  ? `focus-ring ${styles.item} ${styles['item--active']}`
                  : `focus-ring ${styles.item}`
              }
              onClick={() => select(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
