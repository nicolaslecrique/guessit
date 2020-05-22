import React from 'react'
import { Link } from 'react-router-dom'
import { GameSessionResult, getGameSessionResult } from '../service/BackRestService'
import { boardRoute } from '../core/Routing'
import {background, fancyButton, smallMrg, verySmallMrg} from '../style/common_style'
import {createStyles, Typography, WithStyles} from "@material-ui/core"
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';
import LoadingScreen from '../component/LoadingScreen'


interface ScoreProps extends WithStyles<typeof styles> {
  match: {
    params: {
      gameSessionUri: string
    }
  }
}

type ScoreState = {
  gameSessionResult: GameSessionResult | null
}


const styles = () => createStyles({
  background: {
    height: '100vh',
    background: background,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  linkPlay: {
    textDecoration: 'none',
  },
  playButton: {
    ...fancyButton
  },
  entityNameKo: {
    color: "#fff",
    padding: `${verySmallMrg} ${smallMrg} ${verySmallMrg} ${smallMrg}`,
    backgroundColor: 'rgba(255, 136, 0,0.6)',
    borderRadius: "24px"
  },
  entityNameOk: {
    color: "#fff",
    backgroundColor: 'rgba(0, 204, 65,0.6)',
    padding: `${verySmallMrg} ${smallMrg} ${verySmallMrg} ${smallMrg}`,
    borderRadius: "24px"
  },
  title: {
    color: "#fff",
  }
})



class Score extends React.Component<ScoreProps, ScoreState> {
  constructor(props: ScoreProps) {
    super(props)
    this.state = {
      gameSessionResult: null
    }
  }

  componentDidMount(): void {
    const gameSessionUri = this.props.match.params.gameSessionUri;
    if (gameSessionUri) {
      getGameSessionResult(gameSessionUri).then(
        (gameSessionResult) => this.setState({ gameSessionResult: gameSessionResult })
      )
    }
  }

  render(): JSX.Element {

    const { classes } = this.props;

    if (this.state.gameSessionResult === null){
      return <LoadingScreen/>
    }

    const sessions = this.state.gameSessionResult.entityGuessingSessions

    const totalEntities = sessions.length
    const foundEntities = sessions.filter(s => s.entityToGuessName === s.entityGuessedName).length

    return (
      <div className={classes.background}>
        <Typography  className={classes.title} variant="h3" >{foundEntities}/{totalEntities} found</Typography>
        {
          this.state.gameSessionResult.entityGuessingSessions.map(
            (entityGuessing, index) => (
                <Typography
                  key={index}
                  className={entityGuessing.entityToGuessName === entityGuessing.entityGuessedName ? classes.entityNameOk : classes.entityNameKo}
                  variant="h5" >
                  {entityGuessing.entityToGuessName}
                </Typography>
          )
          )
        }
        <Link className={classes.linkPlay} to={boardRoute}>
          <Button variant="contained" color="primary" className={classes.playButton}>Play again !</Button>
        </Link>
      </div>
    )
  }
}

export default withStyles(styles)(Score)
