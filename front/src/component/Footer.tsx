import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Typography} from '@material-ui/core'
import {extraSmallMrg} from '../style/common_style'
import {Link} from 'react-router-dom'
import {aboutRoute} from '../core/Routing'

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
    <Typography className={classes.footerMessage}  align="center" variant="subtitle1">
      <Link to={aboutRoute}>
      About us
      </Link>
    </Typography>
    )
}

export default Footer
