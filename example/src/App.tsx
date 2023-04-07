import { Collapsible, RevealType } from 'collapsible-react-component'
import 'collapsible-react-component/dist/index.css'
import React from 'react'

const revealTypes = ['bottomFirst', 'topFirst'] as const

const App = () => {
  const [open, setOpen] = React.useState(true)
  const [revealType, setRevealType] = React.useState<RevealType>(revealTypes[0])

  return (
    <>
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
    </>
  )
}

export default App
