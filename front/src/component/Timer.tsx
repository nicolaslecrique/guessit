import React from 'react'


type TimerProps = {
  nbSeconds: number
  onFinish: () => void
  onTick: (secondsLeft: number) => void
}

type TimerState = {
  timeLeft: number
}
  
class Timer extends React.Component<TimerProps, TimerState> {
  timerId!: NodeJS.Timeout

  constructor(props: TimerProps) {
    super(props);
    this.state = {
      timeLeft: props.nbSeconds
    }
  }

  componentDidMount(): void {
    this.timerId = setInterval(() => this.onTimer(), 1000)
  }

  componentWillUnmount(): void {
    clearInterval(this.timerId)
  }

  onTimer(): void {
    const timeLeft = this.state.timeLeft - 1
    this.setState({ timeLeft: timeLeft })
    this.props.onTick(timeLeft)
    if (this.state.timeLeft === 0) {
      clearInterval(this.timerId)
      this.props.onFinish()
    }
  }

  render(): JSX.Element | null {
    return null
  }
}

export default Timer
