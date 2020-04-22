import React from 'react'


type TimerState = {
  timeLeft: number
}
  
class Timer extends React.Component<{}, TimerState> {
  timerId!: NodeJS.Timeout

  constructor(props: {}) {
    super(props);
    this.state = {
      timeLeft: 30
    }
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.onTimer(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  onTimer() {
    this.setState({ timeLeft: this.state.timeLeft - 1 })
    if (this.state.timeLeft === 0) {
      clearInterval(this.timerId)
    }
  }

  render() {
    return (<span>{this.state.timeLeft} second(s) left</span>)
  }
}

export default Timer
