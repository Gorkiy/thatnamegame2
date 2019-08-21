import React, { Component } from 'react';
import './Scoreboard.css';

class Scoreboard extends Component {
  
  componentDidUpdate() {
  }
  
  calcUserTurn() {
    if (this.props.turn <= 1) return 0;
    return Math.floor((this.props.turn) / 2);
  }
  
  render() {
    return (
      <div className="score-board">
        <div className="score-board__item timeleft">
          <span className="timeleft__title">Время:</span> <span className="timeleft__value">{this.props.timeLeft}</span>
        </div>
        <div className="score-board__item score-turn">
          Ход: {this.calcUserTurn()}
        </div>
        <div className="score-board__item score">
          Счет: {this.props.score}
        </div>
      </div>
    );
  }
}

export default Scoreboard;