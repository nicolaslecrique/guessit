import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import About from '../component/About'
import Intro from '../component/Intro'
import Board from '../component/Board'
import Score from '../component/Score'
import Base from '../component/Base'


const scoreRoutePattern = "/score/:gameSessionUri"

export const homeRoute = "/"
export const aboutRoute = "/about"
export const boardRoute = "/board"

export const scoreRoute = (gameSessionUri: string): string =>  `/score/${gameSessionUri}`

export const routing = (
  <Router>
    <Base>
      <Route exact path={homeRoute} component={Intro}></Route>
      <Route path={aboutRoute} component={About}></Route>
      <Route path={boardRoute} component={Board}></Route>
      <Route path={scoreRoutePattern} component={Score}></Route>
    </Base>
  </Router>
)