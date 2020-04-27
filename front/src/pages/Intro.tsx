import React from 'react'
import { Link } from 'react-router-dom'
import { Discussion, MessageProps } from '../component/Discussion'
import { boardRoute } from '../core/Routing'
import {Typography} from "@material-ui/core"


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
        <Typography variant="h2">
            Heading H2
        </Typography>
      <div>Can an AI guess what you are talking about ?</div>
      <br/>
      <Discussion messages={messages}/>
      <br/>
      <Link to={boardRoute}><button>Let's play !</button></Link>
    </div>
  )
}

export default Intro
