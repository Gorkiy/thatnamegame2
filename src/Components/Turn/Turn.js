import React, { Component } from 'react';
import './Turn.css';

class Turn extends Component {
  
  renderTurn() {
    if (this.props.blank) {
      return (
        <li className="turns__item">
          {this.props.firstLetter + '...' || '...'} <span className="turn__player">{this.props.player}</span>
        </li>
      );
    } else {
      return (
        <li className="turns__item">
          {this.props.city} <span className="turn__player">{this.props.player}</span>
        </li>
      );
    }
  }

  render() {
    return this.renderTurn();
  }
}

export default Turn;