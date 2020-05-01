import React from 'react'
import {Link} from 'react-router-dom'
import {Discussion} from '../component/Discussion'
import {boardRoute} from '../core/Routing'
import {createStyles, Typography, WithStyles} from "@material-ui/core"
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';
import {AiConfidence, Author, MessageProps} from '../component/Message'


const demoMessages: MessageProps[] = [
    { author: Author.Player, message: "It's a robot", aiConfidence: null },
    { author: Author.AI, message: "Wall-E ?", aiConfidence: AiConfidence.Thinking  },
    { author: Author.Player, message: "In Star Wars", aiConfidence: null  },
    { author: Author.AI, message: "R2D2 ?", aiConfidence: AiConfidence.Confident  },
    { author: Author.Player, message: "The one who talks a lot", aiConfidence: null  },
    { author: Author.AI, message: "C3PO !", aiConfidence: AiConfidence.Sure  },
]



const styles = () => createStyles({
  root: {
    minHeight: '100vh',
    background: 'linear-gradient(160deg,#fd9536,#a42f80 31%,#2c146c 79%)'
  },
  rootContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    maxWidth: '720px',
    margin: 'auto',
    height: '100vh',
  },
  // linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  // background: '#fffb1e'
  title: {
    margin: '24px',
    fontFamily: '\'Permanent Marker\', cursive',
    color: "#fff"
  },
  subtitle: {
    margin: '0px 24px 24px 24px',
    color: "#fff",
  },
  playButton: {
    fontFamily: '\'Permanent Marker\', cursive',
    fontSize: '20px',
    width: '100%',
    backgroundColor: "#fff",
    color: "#2c146c"
  },
  playButtonContainer: {
    width: '200px',
    alignSelf: 'center',
    margin: '24px',
  }

})

type IntroState = {
  messagesToDisplay: MessageProps[]
}

interface IProps extends WithStyles<typeof styles> {
}

// TODO: Faire en sorte que "Discussion" prenne tout l'espace disponible
// puis si ça depasse ça scroll à l'intérieur de la discussion

class Intro extends React.Component<IProps, IntroState> {
  private timerId! : NodeJS.Timeout

  constructor(props: IProps) {
    super(props)
    this.state = {
      messagesToDisplay: []
    }
  }

  componentDidMount(): void {
    this.timerId = setInterval(() => this.onTimer(), 1000)
  }

  componentWillUnmount(): void {
    clearInterval(this.timerId)
  }


  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.rootContent}>
          <Typography variant="h2" align="center" className={classes.title} component="h1">
            Guess It AI!
          </Typography>
          <Typography variant="h3" align="center" className={classes.subtitle} component="h2">
            Can an AI guess what you are talking about ?
          </Typography>
          <Discussion messages={this.state.messagesToDisplay}/>
          <div className={classes.playButtonContainer}>
            <Link to={boardRoute}><Button variant="contained" color="primary" className={classes.playButton}>Let's play
              !</Button></Link>
          </div>
        </div>
      </div>
    )
  }

  private onTimer() {
    const newSize = (this.state.messagesToDisplay.length + 1) % (demoMessages.length + 1)
    this.setState({
      messagesToDisplay: demoMessages.slice(0, newSize)
    })
  }
}

export default withStyles(styles)(Intro)
