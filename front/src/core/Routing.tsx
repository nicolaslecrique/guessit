import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Intro from '../pages/Intro'
import Board from '../pages/Board'
import Score from '../pages/Score'
import Base from '../component/Base'

const scoreRoutePattern = "/score/:gameSessionUri"

export const homeRoute = "/"
export const boardRoute = "/board"

export const scoreRoute = (gameSessionUri: string): string =>  `/score/${gameSessionUri}`

export const routing = (
  <Router>
    <Base>
      <Route exact path={homeRoute} component={Intro}/>
      <Route path={boardRoute} component={Board}/>
      <Route path={scoreRoutePattern} component={Score}/>
    </Base>
  </Router>
)
