import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import About from './About'
import Intro from './Intro'
import Board from './Board'
import Score from './Score'
import './index.css'


const routing = (
  <Router>
    <Route exact path="/" component={Intro}></Route>
    <Route path="/about" component={About}></Route>
    <Route path="/board" component={Board}></Route>
    <Route path="/score/:gameSessionUri" component={Score}></Route>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
