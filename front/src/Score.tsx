import React from 'react'
import { Link } from 'react-router-dom'
import Base from './Base'
import { GameSessionResult, getGameSessionResult } from './BackRestService'

type ScoreProps = {
  match: {
    params: {
      gameSessionUri: string
    }
  }
}

type ScoreState = {
  gameSessionResult: GameSessionResult
}

class Score extends React.Component<ScoreProps, ScoreState> {
  constructor(props: ScoreProps) {
    super(props)
    this.state = {
      gameSessionResult: {
        entityGuessingSessions: []
      }
    }
  }

  componentDidMount() {
    const gameSessionUri = this.props.match.params.gameSessionUri;
    if (gameSessionUri) {
      getGameSessionResult(gameSessionUri).then(
        (gameSessionResult) => this.setState({ gameSessionResult: gameSessionResult })
      )
    }
  }

  render() {
    return (
      <Base>
        {
          this.state.gameSessionResult.entityGuessingSessions.map(
            entityGuessing => {return (<div>{entityGuessing.entityToGuessName} | {entityGuessing.entityGuessedName}</div>)}
          )
        }
        <br/>
        <Link to="/board"><button>Let's play again !</button></Link>
      </Base>
    )
  }
}

export default Score
