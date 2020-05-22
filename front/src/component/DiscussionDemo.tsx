import React from 'react'
import {Discussion} from './Discussion'
import {createStyles, Typography, WithStyles} from "@material-ui/core"
import { withStyles } from '@material-ui/core/styles';
import {AiConfidence, Author, MessageProps} from './Message'
import {background, fancyButton, fancyFontFamily, smallMrg, stdMrg} from '../style/common_style'


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
    height: '100%',
    background: background,
    paddingLeft: smallMrg,
    paddingRight: smallMrg,
  },
  rootContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    maxWidth: '720px',
    margin: 'auto',
    height: '90%', // trick because on mobile address bar count in the 100%
  },
  title: {
    margin: stdMrg,
    fontFamily: fancyFontFamily,
    color: "#fff"
  },
  subtitle: {
    margin: `0px ${stdMrg} ${stdMrg} ${stdMrg}`,
    color: "#fff",
  },
  playButton: {
    ...fancyButton
  },
  playButtonContainer: {
    width: '200px',
    alignSelf: 'center',
    margin: stdMrg,
  },
  linkPlay: {
    textDecoration: 'none',
  }
})

type DiscussionDemoState = {
  messagesToDisplay: MessageProps[]
}

interface IProps extends WithStyles<typeof styles> {
}


class DiscussionDemo extends React.Component<IProps, DiscussionDemoState> {
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
          <Discussion messages={this.state.messagesToDisplay} demoMode={true}/>
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

export default withStyles(styles)(DiscussionDemo)
