import * as React from 'react'
// eslint-disable-next-line no-unused-vars
import type { RevealType } from './RevealType'
import styles from './styles.module.css'

export type CollapsibleProps = {
  open: boolean
  revealType?: RevealType
  onTransitionEnd?: (open: boolean) => void
  children?: React.ReactNode
}

export const Collapsible: React.FunctionComponent<CollapsibleProps> = ({
  children,
  open,
  onTransitionEnd,
  revealType = 'bottomFirst' // @TODO
}) => {
  console.log(onTransitionEnd) // @TODO

  return (
    <div
      className={`${styles.wrapper} ${
        open ? styles.is_state_open : styles.is_state_closed
      } ${styles[`is_revealType_${revealType}`]}`}
      aria-hidden={!open}
    >
      <div className={styles.content}>{children}</div>
    </div>
  )
}
