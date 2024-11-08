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
	const [state, setState] = useState({ isOpen: open, isTransitioning: false })
	const isOpenRef = useRef(open)

	useEffect(() => {
		if (isOpenRef.current === open) {
			return
		}
		isOpenRef.current = open
		onTransitionStart?.(open)
		setState({ isOpen: open, isTransitioning: true })
	}, [onTransitionStart, open])

	const handleTransitionEnd = useCallback(
		(event: TransitionEvent) => {
			if (
				event.propertyName === transitioningProperty &&
				event.target === wrapperRef.current
			) {
				onTransitionEnd?.(open)
				setState({ isOpen: open, isTransitioning: false })
			}
		},
		[open, onTransitionEnd],
	)

	const className = useMemo(() => {
		const classNames: string[] = [
			styles.wrapper,
			state.isOpen ? styles.is_state_open : styles.is_state_closed,
			styles[`is_revealType_${revealType}`],
		]

		if (state.isTransitioning) {
			classNames.push(styles.is_transitioning)
		}

		return classNames.join(' ')
	}, [state, revealType])

	return (
		<div
			ref={wrapperRef}
			className={className}
			aria-hidden={!state.isOpen}
			onTransitionEnd={handleTransitionEnd}
		>
			<div className={styles.in}>
				<div className={styles.content}>
					{(state.isOpen || state.isTransitioning) && children}
				</div>
			</div>
		</div>
	)
}
