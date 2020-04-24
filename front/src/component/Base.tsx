import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { aboutRoute } from '../core/Routing'


type BaseProps = {
  children: React.ReactNode
}

type BaseState = {
  hasError: boolean
}

class Base extends React.Component<BaseProps, BaseState> {
  constructor(props: BaseProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any): BaseState {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(error, errorInfo)
    // TODO Log the error to an error reporting service
  }

  render() {
    let children: ReactNode
    if (!this.state.hasError) {
      children = (this.props.children)
    } else {
      children = (
        <div>
          <h3>An unexpected error occured</h3>
        </div>
      )
    }

    return (
      <div>
        <header><h1><Link to="/">Guess it AI !</Link></h1></header>
        <div>{children}</div>
        <br/>
        <footer><Link to={aboutRoute}>About Us</Link></footer>
      </div>
    )  
  }
}

export default Base
