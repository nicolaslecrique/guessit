import React from 'react'
import { Link } from 'react-router-dom'
import { GameSessionResult, getGameSessionResult } from './BackRestService'
import { boardRoute } from './Routing'


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

  componentDidMount(): void {
    const gameSessionUri = this.props.match.params.gameSessionUri;
    if (gameSessionUri) {
      getGameSessionResult(gameSessionUri).then(
        (gameSessionResult) => this.setState({ gameSessionResult: gameSessionResult })
      )
    }
  }

  render(): JSX.Element {
    return (
      <div>
        {
          this.state.gameSessionResult.entityGuessingSessions.map(
            (entityGuessing, index) => {return (<div key={index}>{entityGuessing.entityToGuessName} | {entityGuessing.entityGuessedName}</div>)}
          )
        }
        <br/>
        <Link to={boardRoute}><button>Let's play again !</button></Link>
      </div>
    )
  }
}

export default Score
