import { useArgs } from '@storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/react'
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
