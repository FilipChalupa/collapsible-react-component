# Collapsible react component

> Collapses and expands content with an animation.

[![NPM](https://img.shields.io/npm/v/collapsible-react-component.svg)](https://www.npmjs.com/package/collapsible-react-component) ![npm type definitions](https://img.shields.io/npm/types/shared-loading-indicator.svg)

![screencast](https://raw.githubusercontent.com/FilipChalupa/collapsible-react-component/HEAD/screencast.gif)

Try [interactive demo](https://codesandbox.io/s/collapsible-react-component-example-8t6c3b?file=/src/App.js).

## Install

```bash
npm install --save collapsible-react-component
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
        type='button'
        onClick={() => {
          setOpen(!open)
        }}
      >
        {open ? 'Close' : 'Open'}
      </button>
      <Collapsible open={open}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio, sed
        labore? Autem laboriosam minima corrupti rem repellat odio reiciendis
        nihil! Eum natus dolorem atque blanditiis ipsam aperiam. Voluptatem,
        exercitationem fugit.
      </Collapsible>
    </>
  )
}
```
