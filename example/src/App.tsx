import { Collapsible } from 'collapsible-react-component'
import 'collapsible-react-component/dist/index.css'
import React from 'react'

const App = () => {
  const [open, setOpen] = React.useState(true)

  return (
    <>
      <h1>Collapsible react component</h1>
      <button
        type='button'
        onClick={() => {
          setOpen(!open)
        }}
      >
        {open ? 'Close' : 'Open'}
      </button>
      <Collapsible
        open={open}
        onTransitionEnd={(newState) => {
          console.log('Collapsible box is now', newState)
        }}
        type='revealBottomFirst'
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
    </>
  )
}

export default App
