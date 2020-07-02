import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Intro from '../pages/Intro'
import Board from '../pages/Board'
import Score from '../pages/Score'
import Base from '../component/Base'
import About from '../pages/About'

const scoreRoutePattern = "/score/:gameSessionUri"

export const homeRoute = "/"
export const boardRoute = "/board"
export const aboutRoute = "/about"

export const scoreRoute = (gameSessionUri: string): string =>  `/score/${gameSessionUri}`

export const routing = (
  <Router>
    <Base>
      <Route exact path={homeRoute} component={Intro}/>
      <Route path={boardRoute} component={Board}/>
      <Route path={scoreRoutePattern} component={Score}/>
      <Route path={aboutRoute} component={About}/>
    </Base>
  </Router>
)
