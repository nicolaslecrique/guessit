import React from 'react'
import {Link} from 'react-router-dom'
import {boardRoute} from '../core/Routing'
import {Typography} from "@material-ui/core"
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import {background, fancyButton, fancyFontFamily, smallMrg, stdMrg} from '../style/common_style'
import DiscussionDemo from '../component/DiscussionDemo'


const useStyles = makeStyles({
  root: {
    height: '100%',
    background: background,
    paddingLeft: smallMrg,
    paddingRight: smallMrg,
  },
  rootContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    maxWidth: '720px',
    margin: 'auto',
    height: '90%', // trick because on mobile address bar count in the 100%
  },
  title: {
    margin: stdMrg,
    fontFamily: fancyFontFamily,
    color: "#fff"
  },
  subtitle: {
    margin: `0px ${stdMrg} ${stdMrg} ${stdMrg}`,
    color: "#fff",
  },
  playButton: {
    ...fancyButton
  },
  playButtonContainer: {
    width: '200px',
    alignSelf: 'center',
    margin: stdMrg,
  },
  linkPlay: {
    textDecoration: 'none',
  }
})


export default function Intro(): JSX.Element {

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.rootContent}>
        <Typography variant="h2" align="center" className={classes.title} component="h1">
          Guess It AI!
        </Typography>
        <Typography variant="h3" align="center" className={classes.subtitle} component="h2">
          Can an AI guess what you are talking about ?
        </Typography>
        <DiscussionDemo/>
        <div className={classes.playButtonContainer}>
          <Link className={classes.linkPlay} to={boardRoute}>
            <Button variant="contained" color="primary" className={classes.playButton}>Let's play !</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

