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
  
  renderCountry() {
    if (this.props.city) {
      return this.props.country;
    }
  }
  
  renderAvatar(player) {
    return <img src={ `./${player}.svg` } />
  }

  render() {
    return (
      <li className="turns__item">
        <div className="turns__wrapper">
          <span className="turns__city">
            {this.renderCity()}          
          </span>
          <span className="turns__country">
            {this.renderCountry()}
          </span>
        </div>
        <div className={ `turns__player turns__player--${this.props.player}` }>
        </div>
      </li>
    )
  }
}

export default Turn;