import { Collapsible } from 'collapsible-react-component'
import 'collapsible-react-component/dist/index.css'
import React from 'react'

const App = () => {
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

export default App
