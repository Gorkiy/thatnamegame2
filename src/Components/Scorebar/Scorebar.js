import React, { Component } from 'react';
import posed from 'react-pose';
import './Scorebar.css';

// <span className="scorebar__value">{this.props.timeLeft}</span>

const TimeLeft = posed.span({
  normal: {
    scale: 1,
    opacity: 1,
    color: '#ffffff',
    transformOrigin: 'bottom',
    transition: {
      scale: { type: 'spring', stiffness: 700, damping: 20 },
      duration: 150 
    }
  },
  drama: {
    scale: 1.3,
    opacity: 0.8,
    color: '#FD8A2E',
    transition: { duration: 150 }
  }
});

class Scorebar extends Component {
  constructor(props) {
    super(props);
    this.state = { isTimeRunningOut: false }
    this.timer = null;
  }
  
  componentDidUpdate() {
    if (this.props.timeLeft === 5 && !this.timer) {
      this.timer = setInterval(() => {
        this.setState({ isTimeRunningOut: !this.state.isTimeRunningOut });
        if (this.props.timeLeft <= 0 || this.props.gameEnded) {
          clearInterval(this.timer);
          this.setState({ isTimeRunningOut: false});
        }
      }, 250);
    }
  }
  
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  
  calcUserTurn() {
    if (this.props.turn <= 1) return 0;
    return Math.floor((this.props.turn) / 2);
  }
  
  render() {
    const { isTimeRunningOut } = this.state;
    
    return (
      <div className="scorebar-wrapper">
        <div className="scorebar">
          <div className="scorebar__item scorebar__item--score">
            <span className="scorebar__value scorebar__value--score scorebar__value--human">{this.props.score.human}</span>
            <span className="scorebar__value scorebar__value--score scorebar__value--computer">{this.props.score.computer}</span>
          </div>
          <div className="scorebar__item">
            <TimeLeft className="scorebar__value" pose={isTimeRunningOut ? 'drama' : 'normal'}>
              {this.props.timeLeft}
            </TimeLeft>
            <span className="scorebar__caption">Время на ход</span>
          </div>
          <div className="scorebar__item">
            <span className="scorebar__value">{this.calcUserTurn()}</span>
            <span className="scorebar__caption">Номер рейса</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Scorebar;