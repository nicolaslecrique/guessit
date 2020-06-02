import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Typography} from '@material-ui/core'
// @ts-ignore
import Obfuscate from "react-obfuscate";
import {extraSmallMrg} from '../style/common_style'

const useStyles = makeStyles({
  footerMessage: {
    color: "#dbdbdb",
    '& a': {
      color: "#dbdbdb",
    },
    margin: extraSmallMrg
  }

})


function Footer(): JSX.Element {

  const classes = useStyles()

  return (
      <Typography className={classes.footerMessage}  align="center" variant="body2">
        Made by Globers™, <Obfuscate email="guess-it@globers.co"/>
      </Typography>
  )
}

export default Footer
