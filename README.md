# Collapsible react component

> Collapses and expands content with an animation.

[![NPM](https://img.shields.io/npm/v/collapsible-react-component.svg)](https://www.npmjs.com/package/collapsible-react-component) ![npm type definitions](https://img.shields.io/npm/types/shared-loading-indicator.svg)

![screencast](https://raw.githubusercontent.com/FilipChalupa/collapsible-react-component/HEAD/screencast.gif)

Try [interactive demo](https://codesandbox.io/s/collapsible-react-component-example-8t6c3b?file=/src/App.js).

## Install

```bash
npm install collapsible-react-component
```

## Usage

```tsx
import React from 'react'

import { Collapsible } from 'collapsible-react-component'
import 'collapsible-react-component/dist/index.css'

const Example = () => {
	const [open, setOpen] = React.useState(true)

	return (
		<>
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
				revealType="bottomFirst"
			>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio, sed
				labore? Autem laboriosam minima corrupti rem repellat odio reiciendis
				nihil! Eum natus dolorem atque blanditiis ipsam aperiam. Voluptatem,
				exercitationem fugit.
			</Collapsible>
		</>
	)
}
```

### Props

| Name                        | Required | Default       | Type                      | Description                                                                          |
| --------------------------- | -------- | ------------- | ------------------------- | ------------------------------------------------------------------------------------ |
| `open`                      | ✅       |               | `boolean`                 | Determines whether the children content should be visible.                           |
| `children`                  | ✅       |               | `ReactNode`               | Collapsible content.                                                                 |
| `onTransitionStart`         |          | noop          | `(open: boolean) => void` | Callback invoked when transition starts. `open` is the starting state.               |
| `onTransitionEnd`           |          | noop          | `(open: boolean) => void` | Callback after content is fully expanded or fully closed. `open` is the final state. |
| `revealType`                |          | `bottomFirst` | `bottomFirst \| topFirst` | Type of transition animation.                                                        |
| `alwaysKeepChildrenMounted` |          | `false`       | `boolean`                 | If `true` then children won't be unmounted when collapsed.                           |

## Development

Run

```sh
npm ci
npm run dev
```

and

```sh
cd example
npm ci
npm run dev
```
