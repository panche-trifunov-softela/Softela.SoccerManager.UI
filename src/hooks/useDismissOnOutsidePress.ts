import { useEffect } from 'react'

import type { RefObject } from 'react'

/**
 * Calls `onDismiss` when a pointer press lands outside an element, while it is active.
 *
 * @param containerRef The element a press may land in without dismissing.
 * @param isActive Whether there is anything to dismiss; no listener is held while it is false.
 * @param onDismiss Called on each press outside the element; pass a stable function.
 * @returns Nothing.
 */
export function useDismissOnOutsidePress(
  containerRef: RefObject<HTMLElement | null>,
  isActive: boolean,
  onDismiss: () => void,
): void {
  useEffect(() => {
    if (!isActive) return

    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) onDismiss()
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [containerRef, isActive, onDismiss])
}
