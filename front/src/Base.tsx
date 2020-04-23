import React from 'react'
import { Link } from 'react-router-dom'
import { aboutRoute } from './Routing'


type BaseProps = {
  children: React.ReactNode
}

function Base({ children }: BaseProps): JSX.Element {
  return (
    <div>
      <header><h1><Link to="/">Guess it AI !</Link></h1></header>
      <div>{children}</div>
      <br/>
      <footer><Link to={aboutRoute}>About Us</Link></footer>
    </div>
  )
}

export default Base
