import React, { Component } from 'react';
// import { css } from '@emotion/core';
import { PulseLoader } from 'react-spinners';
import './Turn.css';

class Turn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  
  renderCity() {
    if (!this.props.city) {
      return (
        <div className="turns__spinner-wrapper">
          { this.props.firstLetter ? <span className="turns__first-letter">{this.props.firstLetter}</span> : '' }
          <span className="turns__spinner">
            <PulseLoader
            margin={"3px"}
            sizeUnit={"4px"}
            size={0}
            color={'#FD8A2E'}
            loading={this.state.loading}
            />
          </span>
        </div>
      )
    } else {
      return this.props.city;
    }
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
        <div className="turns__city-wrapper">
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