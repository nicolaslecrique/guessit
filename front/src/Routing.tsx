import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import About from './About'
import Intro from './Intro'
import Board from './Board'
import Score from './Score'


const scoreRoutePattern = "/score/:gameSessionUri"

export const homeRoute = "/"
export const aboutRoute = "/about"
export const boardRoute = "/board"

export const scoreRoute = (gameSessionUri: string): string =>  `/score/${gameSessionUri}`

export const routing = (
  <Router>
    <Route exact path={homeRoute} component={Intro}></Route>
    <Route path={aboutRoute} component={About}></Route>
    <Route path={boardRoute} component={Board}></Route>
    <Route path={scoreRoutePattern} component={Score}></Route>
  </Router>
)
