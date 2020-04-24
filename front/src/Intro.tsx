import React from 'react'
import { Link } from 'react-router-dom'
import { Discussion, MessageProps } from './Discussion'
import { boardRoute } from './Routing'


function Intro(): JSX.Element {
  let messages: MessageProps[] = [
    { author: "Human", message: "It's a robot" },
    { author: "AI", message: "Wall-E ?" },
    { author: "Human", message: "In Star Wars" },
    { author: "AI", message: "R2D2 ?" },
    { author: "Human", message: "The one who talks a lot" },
    { author: "AI", message: "C3PO !" },
  ]
  return (
    <div>
      <div>Can an AI guess what you are talking about ?</div>
      <br/>
      <Discussion messages={messages}/>
      <br/>
      <Link to={boardRoute}><button>Let's play !</button></Link>
    </div>
  )
}

export default Intro
