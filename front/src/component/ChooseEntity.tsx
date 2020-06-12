import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {background, fancyButton, fancyFontFamily, secondButton, stdMrg} from '../style/common_style'
import {Typography} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import {numberOfSeconds} from '../core/Game'


type ChooseEntityProps = { 
  entityName: string,
  currentRoundIdx: number,
  nbRounds: number
  onClickGo: () => void,
  onClickPass: () => void
}

const useStyles = makeStyles({
  background: {
    height: '100%',
    background: background,
  },
  root: {
    height: '100%',
    padding: stdMrg
  },
  rootFlex:{
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  letsGoButton: {
    ...fancyButton,
    margin: stdMrg
  },
  passButton: {
    ...secondButton
  },
  message: {
    color: "#fff",
  },
  entityName: {
    color: "#fff",
    fontFamily: fancyFontFamily,
    margin: stdMrg
  },
  roundsCount:{
    color: "#e7e7e7"
  },
  verticalSpace:{
    height: stdMrg
  }
})


function ChooseEntity({ entityName, currentRoundIdx, nbRounds, onClickGo, onClickPass }: ChooseEntityProps): JSX.Element {

  const classes = useStyles()

  return (
    <div className={classes.background}>
      <div className={classes.root}>
        <Typography className={classes.roundsCount} align="center" variant="h5" >Round {currentRoundIdx + 1} / {nbRounds}</Typography>
        <div className={classes.rootFlex}>
          <Typography className={classes.message} align="center" variant="h5" >Describe</Typography>
          <Typography className={classes.entityName} align="center" variant="h3" >{entityName}</Typography>
          <Typography className={classes.message} align="center" variant="h5" >in {numberOfSeconds} seconds</Typography>
          <div className={classes.verticalSpace}/>
          <Button className={classes.letsGoButton} variant="contained" color="primary"  onClick={() => onClickGo()}>Let's GO !</Button>
          <Button className={classes.passButton} variant="outlined" onClick={() => onClickPass()}>Pass</Button>
        </div>
      </div>
    </div>
  )
}

export default ChooseEntity
