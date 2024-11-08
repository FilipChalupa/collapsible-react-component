import * as React from 'react'
import styles from './Collapsible.module.css'
import type { RevealType } from './revealTypes'

const transitioningProperty = 'grid-template-rows'

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
	revealType = 'bottomFirst',
}) => {
	const wrapperRef = React.useRef<HTMLDivElement>(null)
	const [isTransitioning, setIsTransitioning] = React.useState(false)
	const [isOpen, setIsOpen] = React.useState(open)
	const isOpenRef = React.useRef(open)

	React.useEffect(() => {
		if (isOpenRef.current === open) {
			return
		}
		isOpenRef.current = open
		onTransitionStart?.(open)
		setIsOpen(open)
		setIsTransitioning(true)
	}, [onTransitionStart, open])

	const handleTransitionEnd = React.useCallback(
		(event: React.TransitionEvent) => {
			if (
				event.propertyName === transitioningProperty &&
				event.target === wrapperRef.current
			) {
				onTransitionEnd?.(open)
				setIsOpen(open)
				setIsTransitioning(false)
			}
		},
		[open, onTransitionEnd],
	)

	const className = React.useMemo(() => {
		const classNames: string[] = [
			styles.wrapper,
			isOpen ? styles.is_state_open : styles.is_state_closed,
			styles[`is_revealType_${revealType}`],
		]

		if (isTransitioning) {
			classNames.push(styles.is_transitioning)
		}

		return classNames.join(' ')
	}, [isTransitioning, isOpen, revealType])

	return (
		<div
			ref={wrapperRef}
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
