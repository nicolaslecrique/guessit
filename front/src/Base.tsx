import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Base extends Component {
  render() {
    return (
      <div>
        <header><h1><Link to="/">Guess it AI !</Link></h1></header>
        <div>{this.props.children}</div>
        <br/>
        <footer><Link to="/about">About Us</Link></footer>
      </div>
    )
  }
}

export default Base
