import React from 'react'
import { Link } from 'react-router-dom'
import { Discussion } from '../component/Discussion'
import { boardRoute } from '../core/Routing'
import {Typography} from "@material-ui/core"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {MessageProps, Author} from '../component/Message'


const demoMessages: MessageProps[] = [
    { author: Author.Player, message: "It's a robot" },
    { author: Author.AI, message: "Wall-E ?" },
    { author: Author.Player, message: "In Star Wars" },
    { author: Author.AI, message: "R2D2 ?" },
    { author: Author.Player, message: "The one who talks a lot" },
    { author: Author.AI, message: "C3PO !" },
]

const useStyles = makeStyles({
  root: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // TODO should not do that on desktop, might by useless with design complete (with bubbles...)
    // to be able to place play button at the end of the screen size
    // // so root div take at least full screen size (https://stackoverflow.com/questions/2363455/making-div-height-at-least-as-tall-as-the-page-in-css)
    minHeight: '100vh',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #fffb1e 90%)'
  },
  // linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  // background: '#fffb1e'
  title: {
    marginBottom: '24px',
    fontFamily: '\'Permanent Marker\', cursive'
  },
  subtitle: {
    marginBottom: '24px'
  },
  discussionContainer: {

  },
  playButton: {
    width: '100%', // TODO make it full size only on mobile
    fontFamily: '\'Permanent Marker\', cursive'
  },
  playButtonContainer: {
    marginTop: 'auto', // to place button at the bottom of the screen
  }

});

function Intro(): JSX.Element {

  const classes = useStyles()

  return (
    <div className={classes.root}>
        <Typography variant="h2" align="center" className={classes.title} component="h1">
            Guess It AI!
        </Typography>
        <Typography variant="h4" align="center" className={classes.subtitle} component="h2">
            Can an AI guess what you are talking about ?
        </Typography>
      <div className={classes.discussionContainer}>
        <Discussion messages={demoMessages}/>
      </div>
      <div className={classes.playButtonContainer}>
        <Link to={boardRoute}><Button variant="contained" color="primary" className={classes.playButton}>Let's play !</Button></Link>
      </div>
    </div>
  )
}

export default Intro
