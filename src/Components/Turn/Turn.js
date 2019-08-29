import React, { Component } from 'react';
import './Turn.css';

class Turn extends Component {  
  renderCity() {
    if (!this.props.city) {
      return this.props.firstLetter + '...' || '...'
    } else {
      return this.props.city;
    }
  }
  
  componentDidUpdate() {
    // console.log(this.props.turnScore);
  }
  
  renderCountry() {
    if (this.props.city) {
      return this.props.country;
    }
  }
  
  renderTurnNumber(prop) {
    if (prop <= 1) {
      return 1;
    } else {
      return prop;
    }
  }
  
  renderBonus() {
    switch(this.props.size) {
      case 0: 
        return '· Столица (+2)';
      case 2:
        return '· Мегаполис (+1)';
      default: 
        return '';
    }
  }
  
  renderScore() {
    if (this.props.turnScore) {
      return (
        <div className="turns__score">
          {this.props.turnScore}
        </div>
      )
    }
  }

  render() {
    return (
      <li className="turns__item">
        <div className="turns__wrapper">
          <span className="turns__number">
            {this.renderTurnNumber(this.props.turnNumber)}
          </span>
          <span className="turns__city">
            {this.renderCity()}
          </span>
          <span className="turns__country">
            {this.renderCountry()}
          </span>
          <span className="turns__bonus">
            {this.renderBonus()}
          </span>
        </div>
        <div className={ `turns__player turns__player--${this.props.player}` }>
        </div>
        {this.renderScore()}
        
      </li>
    )
  }
}

export default Turn;