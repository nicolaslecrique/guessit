import React from 'react'
import { Link } from 'react-router-dom'
import Base from './Base'
import { Discussion, MessageProps } from './Common'


function Intro() {
  let messages: MessageProps[] = [
    { author: "Human", message: "It's a robot" },
    { author: "AI", message: "Wall-E ?" },
    { author: "Human", message: "In Star Wars" },
    { author: "AI", message: "R2D2 ?" },
    { author: "Human", message: "The one who talks a lot" },
    { author: "AI", message: "C3PO !" },
  ]
  return (
    <Base>
      <div>Can an AI guess what you are talking about ?</div>
      <br/>
      <Discussion messages={messages}/>
      <br/>
      <Link to="/board"><button>Let's play !</button></Link>
    </Base>
  )
}

export default Intro
