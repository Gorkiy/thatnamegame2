import React, { Component } from 'react';
import { PulseLoader } from 'react-spinners';
import SplitText from 'react-pose-text';
import posed from 'react-pose';
import './Turn.css';

const TurnItem = posed.li({
  enter: {
    y: -5,
    rotateX: 0,
    opacity: 1,
    delay: 0,
    transformOrigin: 'bottom',
    transition: {
      rotateX: { type: 'spring', stiffness: 400, damping: 18 },
      default: { duration: 500 }
    }
  },
  exit: {
    rotateX: 180,
    opacity: 0,
    transition: { duration: 500 }
  }
});

const charPoses = {
  exit: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    delay: ({ charIndex }) => charIndex * 30
  }
};

class Turn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      loading: true
    }
    this.timer = null;
  }
  
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ isVisible: true });
    }, 200);
  }
  
  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
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
      return <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>{this.props.city}</SplitText>;
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
    const { isVisible } = this.state;
    
    return (
      <TurnItem className="turns__item" pose={isVisible ? 'enter' : 'exit'}>
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
      </TurnItem>
    )
  }
}

export default Turn;