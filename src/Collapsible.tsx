'use client'

import {
	FunctionComponent,
	ReactNode,
	TransitionEvent,
	useCallback,
	useReducer,
	useRef,
} from 'react'
import styles from './Collapsible.module.css'
import { RevealType, revealTypes } from './revealTypes'

const transitioningProperty = 'grid-template-rows'

export type CollapsibleProps = {
	open: boolean
	revealType?: RevealType
	onTransitionStart?: (open: boolean) => void
	onTransitionEnd?: (open: boolean) => void
	children?: ReactNode
	alwaysKeepChildrenMounted?: boolean
}

const next = (callback: () => void) => Promise.resolve().then(callback)

export const Collapsible: FunctionComponent<CollapsibleProps> = ({
	children,
	open,
	onTransitionEnd,
	onTransitionStart,
	revealType = revealTypes[0],
	alwaysKeepChildrenMounted = false,
}) => {
	const wrapperRef = useRef<HTMLDivElement>(null)
	const lastOpenRef = useRef(open)
	const stateRef = useRef({ open, transitioning: false })
	const [, forceRender] = useReducer((counter: number) => {
		return counter + 1
	}, 0)

	if (lastOpenRef.current !== open) {
		lastOpenRef.current = open
		next(() => {
			onTransitionStart?.(open)
		})
		stateRef.current = { open, transitioning: true }
	}

	const handleTransitionEnd = useCallback(
		(event: TransitionEvent) => {
			if (
				event.propertyName === transitioningProperty &&
				event.target === wrapperRef.current
			) {
				next(() => {
					onTransitionEnd?.(open)
				})
				stateRef.current = { open: open, transitioning: false }
				forceRender()
			}
		},
		[open, onTransitionEnd],
	)

	const className = (() => {
		const classNames: string[] = [
			styles.wrapper,
			stateRef.current.open ? styles.is_state_open : styles.is_state_closed,
			styles[`is_revealType_${revealType}`],
		]

		if (stateRef.current.transitioning) {
			classNames.push(styles.is_transitioning)
		}

		return classNames.join(' ')
	})()

	return (
		<div
			ref={wrapperRef}
			className={className}
			aria-hidden={!stateRef.current.open}
			onTransitionEnd={handleTransitionEnd}
		>
			<div className={styles.in}>
				<div className={styles.content}>
					{(stateRef.current.open ||
						stateRef.current.transitioning ||
						alwaysKeepChildrenMounted) &&
						children}
				</div>
			</div>
		</div>
	)
}
