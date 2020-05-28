import React from 'react'
import {Discussion} from './Discussion'
import {AiConfidence, Author, MessageProps} from './Message'
import {TypingBar} from './TypingBar'


const demoMessages: MessageProps[] = [
  { author: Author.Player, message: "It's a robot", aiConfidence: null },
  { author: Author.AI, message: "Wall-E", aiConfidence: AiConfidence.Thinking  },
  { author: Author.Player, message: "In Star Wars", aiConfidence: null  },
  { author: Author.AI, message: "R2D2", aiConfidence: AiConfidence.Confident  },
  { author: Author.Player, message: "The one who talks a lot", aiConfidence: null  },
  { author: Author.AI, message: "C3PO", aiConfidence: AiConfidence.Sure  },
  { author: Author.Player, message: "", aiConfidence: null  }, // fake message to make reset of message wait
]

const nbTicksBetweenMessages = 20


type DiscussionDemoState = {
  currentMessageIndex: number
  nextCharIndexInCurrentMessage: number
  nbTicksUntilNextMessage: number
}

interface IProps {
}


class DiscussionDemo extends React.Component<IProps, DiscussionDemoState> {
  private timerId! : NodeJS.Timeout

  constructor(props: IProps) {
    super(props)
    this.state = {
      currentMessageIndex: 0,
      nextCharIndexInCurrentMessage: 0,
      nbTicksUntilNextMessage: nbTicksBetweenMessages
    }
  }

  componentDidMount(): void {
    this.timerId = setInterval(() => this.onTimer(), 100)
  }

  componentWillUnmount(): void {
    clearInterval(this.timerId)
  }


  render(): JSX.Element {

    const [messages, currentMessage] = this.buildMessageToDisplay()

    return (
      <>
          <Discussion messages={messages} demoMode={true}/>
          <TypingBar
            onChangeTypedMessage={() => {}}
            onSendMessage={() => {}}
            typedMessage={currentMessage}/>
      </>
    )
  }

  private buildMessageToDisplay(): [MessageProps[], string]{

    const {currentMessageIndex, nextCharIndexInCurrentMessage} = this.state

    let finishedMessages = demoMessages.slice(0, currentMessageIndex)
    let currentMessage = demoMessages[currentMessageIndex]
    let currentMessageSentence = currentMessage.message.slice(0, nextCharIndexInCurrentMessage)
    if (currentMessage.author === Author.Player){
      return [finishedMessages, currentMessageSentence]
    } else {
      return [finishedMessages, ""]
    }

  }

  private onTimer(){

    let {currentMessageIndex, nextCharIndexInCurrentMessage, nbTicksUntilNextMessage} = this.state
    const currentMessageToPrint = demoMessages[currentMessageIndex]
    const currentMessageToPrintLength = currentMessageToPrint.message.length

    if (nbTicksUntilNextMessage > 0){
      this.setState(
        {
          nbTicksUntilNextMessage: nbTicksUntilNextMessage - 1
        }
      )
      return
    }

    if (currentMessageToPrintLength === nextCharIndexInCurrentMessage){
      currentMessageIndex = (currentMessageIndex + 1) % (demoMessages.length)
      nbTicksUntilNextMessage = nbTicksBetweenMessages
      nextCharIndexInCurrentMessage = 0
    } else {
      nextCharIndexInCurrentMessage++
    }

    this.setState(
      {
        currentMessageIndex,
        nextCharIndexInCurrentMessage,
        nbTicksUntilNextMessage
      }
    )

  }
}

export default DiscussionDemo
