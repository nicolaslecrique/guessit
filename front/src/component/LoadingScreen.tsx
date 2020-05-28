import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {background, fancyFontFamily} from '../style/common_style'
import {Typography} from '@material-ui/core'

const useStyles = makeStyles({
  background: {
    height: '100vh',
    background: background,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingMessage: {
    color: "#fff",
    fontFamily: fancyFontFamily,
  }

})


function LoadingScreen(): JSX.Element {

  const classes = useStyles()

  return (
    <div className={classes.background}>
      <Typography className={classes.loadingMessage}  align="center" variant="h3" >Loading...</Typography>
    </div>
  )
}

export default LoadingScreen
