/** Sizes `Logo` renders at. */
export type LogoSize = 'sm' | 'md' | 'xl'

/** Props of `Logo`. */
export interface LogoProps {
  /** Rendered size; `md` when omitted. */
  size?: LogoSize
}
