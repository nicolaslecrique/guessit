import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { aboutRoute } from '../core/Routing'
import CssBaseline from "@material-ui/core/CssBaseline"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {Typography, Theme, responsiveFontSizes} from "@material-ui/core"

type BaseProps = {
  children: React.ReactNode
}

type BaseState = {
  hasError: boolean
}


const theme: Theme = responsiveFontSizes(createMuiTheme({
  typography: {

  }
}));

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
        <React.Fragment>
        <CssBaseline />
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </React.Fragment>
    )  
  }
}

export default Base
