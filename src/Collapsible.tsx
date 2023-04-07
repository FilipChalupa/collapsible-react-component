import * as React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import type { RevealType } from './RevealType'
import style from './styles.module.css'
import { assertNever } from './utils/assertNever'
import { forceReflow } from './utils/forceReflow'

export type CollapsibleProps = {
  open: boolean
  revealType?: RevealType
  onTransitionEnd?: (
    newState: Extract<CollapsibleState, 'open' | 'closed'>
  ) => void
  children?: React.ReactNode
}

type CollapsibleState =
  | 'closed'
  | 'before-open-transition'
  | 'open-transition'
  | 'open'
  | 'before-closed-transition'
  | 'closed-transition'

export const Collapsible: React.FunctionComponent<CollapsibleProps> = ({
  children,
  open,
  onTransitionEnd,
  revealType = 'bottomFirst'
}) => {
  const [state, setState] = useState<CollapsibleState>(open ? 'open' : 'closed')
  const [contentHeight, setContentHeight] = useState('auto')
  const contentRef = useRef<HTMLDivElement>(null)

  const updateContentHeight = useCallback(() => {
    if (!contentRef.current) {
      return
    }
    const contentHeight = `${
      contentRef.current.getBoundingClientRect().height
    }px`
    setContentHeight(contentHeight)
  }, [])

  const handleTransitionEnd = useCallback(
    (event: React.TransitionEvent) => {
      if (event.propertyName === 'visibility') {
        const newState = open ? 'open' : 'closed'
        setState(newState)
        if (onTransitionEnd) {
          onTransitionEnd(newState)
        }
      }
    },
    [open, onTransitionEnd]
  )

  useEffect(() => {
    if (state === 'closed') {
      if (open) {
        updateContentHeight()
        setState('before-open-transition')
      }
    } else if (state === 'before-open-transition') {
      if (open) {
        forceReflow(contentRef.current)
        setState('open-transition')
      }
    } else if (state === 'open-transition') {
      if (!open) {
        setState('closed')
      }
    } else if (state === 'open') {
      if (!open) {
        updateContentHeight()
        setState('before-closed-transition')
      }
    } else if (state === 'before-closed-transition') {
      if (!open) {
        forceReflow(contentRef.current)
        setState('closed-transition')
      }
    } else if (state === 'closed-transition') {
      if (open) {
        setState('open')
      }
    } else {
      assertNever(state)
    }
  }, [open, state, updateContentHeight])

  return (
    <div
      className={`${style.wrapper} ${style[`is_state_${state}`]} ${
        style[`is_revealType_${revealType}`]
      }`}
      style={
        {
          '--Collapsible-content-height': contentHeight
        } as React.CSSProperties // Custom properties not supported workaround
      }
      onTransitionEnd={handleTransitionEnd}
      aria-hidden={!open}
    >
      <div className={style.content} ref={contentRef}>
        {children}
      </div>
    </div>
  )
}
