import { useCallback, useEffect, useRef, useState } from 'react'

import type { HeaderDropdownProps, HeaderDropdownState } from './types'

/**
 * Owns a `HeaderDropdown`'s open state, closing it on an outside pointer press or
 * `Escape`.
 *
 * @param onSelect Receives the chosen entry's id.
 * @returns The state and handlers the view renders from.
 */
export function useHeaderDropdown(onSelect: HeaderDropdownProps['onSelect']): HeaderDropdownState {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((open) => !open), [])

  const select = useCallback(
    (id: string) => {
      onSelect(id)
      close()
    },
    [onSelect, close],
  )

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) close()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, close])

  return { isOpen, containerRef, toggle, select }
}
