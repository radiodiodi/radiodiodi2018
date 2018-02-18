import React from 'react';

// Partially based on https://github.com/uken/react-countdown-timer
class CountdownTimer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      timeRemaining: +new Date(this.props.countTo) - new Date(),
      timeoutId: null,
      prevTime: null
    };
    this.tick = this.tick.bind(this);
  }

  componentDidMount = this.tick;

  componentDidUpdate() {
    const { prevTime, timeRemaining } = this.state;
    if (!prevTime && timeRemaining > 0) {
      this.tick();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeoutId);
  }

  tick() {
    const currentTime = +new Date();
    const dt = this.state.prevTime ? currentTime - this.state.prevTime : 0;
    const { interval } = this.props;

    // Fixes some inaccuracy in timeout
    const timeRemainingInInterval = interval - dt % interval;
    let timeout = timeRemainingInInterval;

    if (timeRemainingInInterval < interval / 2.0) {
      timeout += interval;
    }

    const timeRemaining = Math.max(this.state.timeRemaining - dt, 0);
    const countdownComplete = this.state.prevTime && timeRemaining === 0;

    if (this.state.timeoutId) {
      clearTimeout(this.state.timeoutId);
    }

    this.setState(() => ({
      timeoutId: countdownComplete ? null : setTimeout(this.tick, timeout),
      prevTime: currentTime,
      timeRemaining: timeRemaining
    }));
  }

  getFormattedTime(ms) {
    // TODO: Should days be separated from hours? Where should the translation go?
    // Should the formatting function be passed as prop?
    const totalSeconds = Math.round(ms / 1000);

    let seconds = parseInt(totalSeconds % 60, 10),
      minutes = parseInt(totalSeconds / 60, 10) % 60,
      hours = parseInt(totalSeconds / 3600, 10) % 24,
      days = parseInt(totalSeconds / 86400, 10);

    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;
    days = days < 10 ? '0' + days : days;

    return `${days}:${hours}:${minutes}:${seconds}`;
  }

  render() {
    const { timeRemaining } = this.state;
    return (
      <div className={this.props.className}>
        {this.props.contentTransformFn
          ? this.props.contentTransformFn(this.getFormattedTime(timeRemaining))
          : this.getFormattedTime(timeRemaining)
        }
      </div>
    );
  }
}

export default CountdownTimer;
