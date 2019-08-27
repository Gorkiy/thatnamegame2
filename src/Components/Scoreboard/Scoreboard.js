import React, { Component } from 'react';
import './Scoreboard.css';

class Scoreboard extends Component {  
  calcUserTurn() {
    if (this.props.turn <= 1) return 0;
    return Math.floor((this.props.turn) / 2);
  }
  
  render() {
    return (
      <div className="score-board">
        <div className="score-board__item score-board__item--score">
          <span className="score-board__value">{this.props.score}</span>
        </div>
        <div className="score-board__item">
          <span className="score-board__value">{this.props.timeLeft}</span>
          <span className="score-board__title">Время на ход</span>
        </div>
        <div className="score-board__item">
          <span className="score-board__value">{this.calcUserTurn()}</span>
          <span className="score-board__title">Номер рейса</span>
        </div>
      </div>
    );
  }
}

export default Scoreboard;