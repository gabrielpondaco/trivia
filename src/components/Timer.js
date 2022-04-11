import React from 'react';
import propTypes from 'prop-types';

const second = 1000;
class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      time: 30,
    };
    this.handleTime = this.handleTime.bind(this);
  }

  componentDidMount() {
    this.handleTime();
  }

  handleTime() {
    const interval = setInterval(() => {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }), () => {
        const { time } = this.state;
        const { onChange } = this.props;
        onChange(time);
        if (time === 0) {
          clearInterval(interval);
          const buttons = document.querySelectorAll('button');
          buttons.forEach((button) => {
            button.disabled = true;
          });
        }
      });
    }, second);
  }

  render() {
    const { time } = this.state;
    return (
      <p id="timer" className="digitalFont">{ time }</p>
    );
  }
}

Timer.propTypes = {
  onChange: propTypes.func.isRequired,
};

export default Timer;
