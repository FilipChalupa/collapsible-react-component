import { useArgs } from '@storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/react'
import {
	QueryClient,
	QueryClientProvider,
	useSuspenseQuery,
} from '@tanstack/react-query'
import {
	FunctionComponent,
	PropsWithChildren,
	Suspense,
	useDeferredValue,
} from 'react'
import { Collapsible } from './Collapsible'
import './Collapsible.stories.css'
import { revealTypes } from './revealTypes'

const meta: Meta<typeof Collapsible> = {
	title: 'Collapsible',
	argTypes: {
		revealType: {
			control: {
				type: 'select',
			},
			options: revealTypes,
		},
	},
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Main: Story = {
	args: {
		revealType: revealTypes[0],
		open: true,
	},
	render: ({ revealType, open }) => {
		const [, updateArgs] = useArgs()

		return (
			<div className="wrapper">
				<h1>Collapsible react component</h1>
				<button
					type="button"
					onClick={() => {
						updateArgs({ open: !open })
					}}
				>
					{open ? 'Close' : 'Open'}
				</button>
				<Collapsible
					open={open}
					onTransitionStart={(open) => {
						console.log('Collapsible box used to be', open ? 'open' : 'closed')
					}}
					onTransitionEnd={(open) => {
						console.log('Collapsible box is now', open ? 'open' : 'closed')
					}}
					revealType={revealType}
					alwaysKeepChildrenMounted
				>
					<h2>Collapsible content</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio, sed
						labore? Autem laboriosam minima corrupti rem repellat odio
						reiciendis nihil! Eum natus dolorem atque blanditiis ipsam aperiam.
						Voluptatem, exercitationem fugit.
					</p>
				</Collapsible>
				<h2>Other content</h2>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit delectus
					tempora suscipit impedit deserunt eius autem fuga qui harum,
					praesentium quae, quas eveniet cupiditate molestiae esse quis eligendi
					ratione deleniti?
				</p>
			</div>
		)
	},
}

const queryClient = new QueryClient()
const counterQueryKey = ['counter']
const forgetData = () => {
	queryClient.removeQueries({
		queryKey: counterQueryKey,
	})
}

export const SuspenseStory: Story = {
	args: {
		open: false,
	},
	decorators: [
		(Story) => (
			<QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
		),
	],
	render: ({ revealType, open }) => {
		const [, updateArgs] = useArgs()

		const openDeferred = useDeferredValue(open)
		const loading = openDeferred !== open

		return (
			<div className="wrapper">
				<h1>Collapsible react component</h1>
				<button
					type="button"
					onClick={() => {
						updateArgs({ open: !open })
					}}
					disabled={loading}
				>
					{openDeferred ? 'Close' : 'Open'}
				</button>{' '}
				{loading && 'Loading…'}
				<div>
					<SuspenseWrapper>
						<Collapsible
							open={openDeferred}
							revealType={revealType}
							onTransitionEnd={(open) => {
								if (!open) {
									forgetData()
								}
							}}
						>
							<DelayedContent />
						</Collapsible>
					</SuspenseWrapper>
				</div>
			</div>
		)
	},
}
SuspenseStory.storyName = 'Suspense'

const SuspenseWrapper: FunctionComponent<PropsWithChildren> = ({
	children,
}) => {
	return <Suspense fallback={<p>Loading initial data</p>}>{children}</Suspense>
}

let counter = 0
const DelayedContent: FunctionComponent = () => {
	const content = useSuspenseQuery({
		queryKey: counterQueryKey,
		queryFn: async () => {
			await new Promise((resolve) => setTimeout(resolve, 2000))
			return ++counter
		},
		networkMode: 'always',
		staleTime: Infinity,
	})

	return (
		<div>
			<p>
				Open counter <output>{content.data}</output>
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eius in
				sed suscipit illum accusantium accusamus inventore maiores consectetur.
				Officiis ab recusandae voluptate tempore nisi tempora repellat deleniti
				odio officia.
			</p>
		</div>
	)
}
