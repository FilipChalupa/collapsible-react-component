import {
	ReactNode,
	TransitionEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import styles from './Collapsible.module.css'
import type { RevealType } from './revealTypes'

const transitioningProperty = 'grid-template-rows'

export type CollapsibleProps = {
	open: boolean
	revealType?: RevealType
	onTransitionStart?: (open: boolean) => void
	onTransitionEnd?: (open: boolean) => void
	children?: ReactNode
}

export const Collapsible: React.FunctionComponent<CollapsibleProps> = ({
	children,
	open,
	onTransitionEnd,
	onTransitionStart,
	revealType = 'bottomFirst',
}) => {
	const wrapperRef = useRef<HTMLDivElement>(null)
	const [isTransitioning, setIsTransitioning] = useState(false)
	const [isOpen, setIsOpen] = useState(open)
	const isOpenRef = useRef(open)

	useEffect(() => {
		if (isOpenRef.current === open) {
			return
		}
		isOpenRef.current = open
		onTransitionStart?.(open)
		setIsOpen(open)
		setIsTransitioning(true)
	}, [onTransitionStart, open])

	const handleTransitionEnd = useCallback(
		(event: TransitionEvent) => {
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

	const className = useMemo(() => {
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
