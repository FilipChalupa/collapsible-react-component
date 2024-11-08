import { ReactNode, TransitionEvent, useCallback, useRef } from 'react'
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

export const Collapsible: React.FunctionComponent<CollapsibleProps> = ({
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

	if (lastOpenRef.current !== open) {
		lastOpenRef.current = open
		setTimeout(() => {
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
				setTimeout(() => {
					onTransitionEnd?.(open)
				})
				stateRef.current = { open: open, transitioning: false }
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
