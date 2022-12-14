import React from 'react'
import {Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import {background, fancyButton, fancyFontFamily, smallMrg, stdMrg} from '../style/common_style'
import {Typography} from '@material-ui/core'
// @ts-ignore
import Obfuscate from "react-obfuscate"
import {homeRoute} from '../core/Routing'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
  root: {
    background: background,
    paddingLeft: smallMrg,
    paddingRight: smallMrg,
  },
  rootFlex: {
    height: '100%',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
  title: {
    color: "#fff",
    fontFamily: fancyFontFamily,
    margin: stdMrg
  },
  content: {
    color: "#fff",
    margin: stdMrg,
    '& a': {
      color: "#dbdbdb",
    },

  },
  link: {
    textDecoration: 'none',
  },
  backButton: {
    ...fancyButton,
    marginBottom: stdMrg
  },
})


export default function About(): JSX.Element {

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.rootFlex}>
        <Typography className={classes.title} align="center" variant="h5">
          What is GuessIt.AI ?
        </Typography>
        <Typography className={classes.content} align="center" variant="h6">
          GuessIt.AI is a game built with Machine learning. Describe a character and the AI will try to guess who it is.
          The more you play, the better the AI becomes !
        </Typography>
        <Typography className={classes.title} align="center" variant="h5">
          Why did you do it ?
        </Typography>
        <Typography className={classes.content} align="center" variant="h6">
          Our mission is to help people who need to improve their English.
          <br/>
          <br/>
          Passive learning (videos, books) is great, but at some point you hit a wall, and it becomes
          essential you write and speak in English to keep improving. You have to form genuine sentences, in context, and in real time.
          <br/>
          <br/>
          That is where millions of people get stuck. They don't have the time or money to get a tutor. Or they are too
          self-conscious to start conversations with strangers in English.
          <br/>
          <br/>
          Our goal is to help those people get past that wall, a few minutes at a time, without judgement, and from the
          comfort of their couch.
          <br/>
          <br/>
          GuessIt.AI is a first step towards this goal. It is a research project to improve the ability of the AI to
          understand, reply, and give corrections to people learning English.
        </Typography>
        <Typography className={classes.title} align="center" variant="h5">
          How does it work ?
        </Typography>
        <Typography className={classes.content} align="center" variant="h6">
          GuessIt.AI uses NLP and deep learning algorithms to understand the sentences you type in. It's based on models
          like the state-of-the-art BERT model, fine-tuned for our needs.
        </Typography>
        <Typography className={classes.title} align="center" variant="h5">
          Can I contact you ?
        </Typography>
        <Typography className={classes.content} align="center" variant="h6">
          GuessIt.AI is made by Globers???, you can contact us at <Obfuscate email="guess-it@globers.co"/>
        </Typography>
        <Link className={classes.link} to={homeRoute}>
          <Button variant="contained" color="primary" className={classes.backButton}>Back</Button>
        </Link>
      </div>
    </div>
  )
}

