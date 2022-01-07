import * as React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import style from './styles.module.css'
import { assertNever } from './utils/assertNever'
import { forceReflow } from './utils/forceReflow'

export type CollapsibleProps = {
  open: boolean
  type?: 'revealTopFirst' | 'revealBottomFirst'
}

type CollapsibleState =
  | 'close'
  | 'before-open-transition'
  | 'open-transition'
  | 'open'
  | 'before-close-transition'
  | 'close-transition'

export const Collapsible: React.FunctionComponent<CollapsibleProps> = ({
  children,
  open,
  type = 'revealBottomFirst'
}) => {
  const [state, setState] = useState<CollapsibleState>(open ? 'open' : 'close')
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

  const onTransitionEnd = useCallback(
    (event: React.TransitionEvent) => {
      if (event.propertyName === 'visibility') {
        setState(open ? 'open' : 'close')
      }
    },
    [open]
  )

  useEffect(() => {
    if (state === 'close') {
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
        setState('close')
      }
    } else if (state === 'open') {
      if (!open) {
        updateContentHeight()
        setState('before-close-transition')
      }
    } else if (state === 'before-close-transition') {
      if (!open) {
        forceReflow(contentRef.current)
        setState('close-transition')
      }
    } else if (state === 'close-transition') {
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
        style[`is_type_${type}`]
      }`}
      style={
        {
          '--Collapsible-content-height': contentHeight
        } as React.CSSProperties // Custom properties not supported workaround
      }
      onTransitionEnd={onTransitionEnd}
      aria-hidden={!open}
    >
      <div className={style.content} ref={contentRef}>
        {children}
      </div>
    </div>
  )
}
