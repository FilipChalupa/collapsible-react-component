import * as React from 'react'
// eslint-disable-next-line no-unused-vars
import type { RevealType } from './RevealType'
import styles from './styles.module.css'

export type CollapsibleProps = {
  open: boolean
  revealType?: RevealType
  onTransitionStart?: (open: boolean) => void
  onTransitionEnd?: (open: boolean) => void
  children?: React.ReactNode
}

export const Collapsible: React.FunctionComponent<CollapsibleProps> = ({
  children,
  open,
  onTransitionEnd,
  onTransitionStart,
  revealType = 'bottomFirst'
}) => {
  const [isTransitioning, setIsTransitioning] = React.useState(false)

  React.useLayoutEffect(() => {
    return () => {
      if (onTransitionStart) {
        onTransitionStart(open)
      }
      setIsTransitioning(true)
    }
  }, [open])

  const handleTransitionEnd = React.useCallback(
    (event: React.TransitionEvent) => {
      if (event.propertyName === 'grid-template-rows') {
        if (onTransitionEnd) {
          onTransitionEnd(open)
        }
        setIsTransitioning(false)
      }
    },
    [open, onTransitionEnd]
  )

  const className = React.useMemo(() => {
    const classNames: string[] = [
      styles.wrapper,
      open ? styles.is_state_open : styles.is_state_closed,
      styles[`is_revealType_${revealType}`]
    ]

    if (isTransitioning) {
      classNames.push(styles.is_transitioning)
    }

    return classNames.join(' ')
  }, [isTransitioning, open])

  return (
    <div
      className={className}
      aria-hidden={!open}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className={styles.in}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}
