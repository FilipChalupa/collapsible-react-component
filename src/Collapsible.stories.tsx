import type { Meta, StoryObj } from '@storybook/react'
import { type FunctionComponent, useState } from 'react'
import { Collapsible } from './Collapsible'
import './Collapsible.stories.css'
import { RevealType, revealTypes } from './revealTypes'

const meta = {
	title: 'Collapsible',
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const All: Story = {
	render: () => <Render />,
}

const Render: FunctionComponent = () => {
	const [open, setOpen] = useState(true)
	const [revealType, setRevealType] = useState<RevealType>(revealTypes[0])

	return (
		<div className="wrapper">
			<h1>Collapsible react component</h1>
			<div>
				<label>
					<code>revealType</code>:{' '}
					<select
						onChange={(event) => {
							setRevealType(event.target.value as RevealType)
						}}
					>
						{revealTypes.map((type) => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</select>
				</label>
			</div>
			<button
				type="button"
				onClick={() => {
					setOpen(!open)
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
			>
				<h2>Collapsible content</h2>
				<p>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio, sed
					labore? Autem laboriosam minima corrupti rem repellat odio reiciendis
					nihil! Eum natus dolorem atque blanditiis ipsam aperiam. Voluptatem,
					exercitationem fugit.
				</p>
			</Collapsible>
			<h2>Other content</h2>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit delectus
				tempora suscipit impedit deserunt eius autem fuga qui harum, praesentium
				quae, quas eveniet cupiditate molestiae esse quis eligendi ratione
				deleniti?
			</p>
		</div>
	)
}
