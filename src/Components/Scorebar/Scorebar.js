import React, { Component } from 'react';
import './Scorebar.css';

class Scorebar extends Component {  
  calcUserTurn() {
    if (this.props.turn <= 1) return 0;
    return Math.floor((this.props.turn) / 2);
  }
  
  render() {
    return (
      <div className="scorebar-wrapper">
        <div className="scorebar">
          <div className="scorebar__item scorebar__item--score">
            <span className="scorebar__value scorebar__value--score scorebar__value--human">{this.props.score.human}</span>
            <span className="scorebar__value scorebar__value--score scorebar__value--computer">{this.props.score.computer}</span>
          </div>
          <div className="scorebar__item">
            <span className="scorebar__value">{this.props.timeLeft}</span>
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