import type { RoutePath } from '@/constants/routes'

/** One entry in the layout's navigation. */
export interface NavItem {
  /** Text the link shows. */
  label: string

  /** Route the link navigates to. */
  path: RoutePath
}
