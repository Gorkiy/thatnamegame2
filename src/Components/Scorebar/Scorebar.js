import React, { Component } from 'react';
import './Scorebar.css';

class Scorebar extends Component {  
  calcUserTurn() {
    if (this.props.turn <= 1) return 0;
    return Math.floor((this.props.turn) / 2);
  }
  
  componentDidUpdate() {
    // console.log(this.props.score);
  }
  
  render() {
    return (
      <div className="scorebar">
        <div className="scorebar__item scorebar__item--score">
          <span className="scorebar__value scorebar__value--score scorebar__value--human">{this.props.score.human}</span>
          {/*
          <span className="scorebar__avatar scorebar__avatar--human"></span>
          <span className="scorebar__avatar scorebar__avatar--computer"></span>
          */}
          <span className="scorebar__value scorebar__value--score scorebar__value--computer">{this.props.score.computer}</span>
        </div>
        <div className="scorebar__item">
          <span className="scorebar__value">{this.props.timeLeft}</span>
          <span className="scorebar__title">Время на ход</span>
        </div>
        <div className="scorebar__item">
          <span className="scorebar__value">{this.calcUserTurn()}</span>
          <span className="scorebar__title">Номер рейса</span>
        </div>
      </div>
    );
  }
}

export default Scorebar;