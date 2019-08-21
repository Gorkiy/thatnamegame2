import React, { Component } from 'react';
import Turn from '../Turn/Turn';
import './TurnsList.css';

class TurnsList extends Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }
  
  componentDidUpdate() {
    const list = this.listRef.current;
    list.scrollTop = list.scrollHeight;
  }
  
  renderTurns() {  
    const turns = this.props.playedCities.map(cityObj => {
      return <Turn key={cityObj.turnNumber} city={cityObj.city} country={cityObj.country} player={cityObj.player} />;
    });
    
    if (!this.props.gameEnded) {
      let currentTurn = <Turn key={this.props.turnNumber + 1} firstLetter={this.props.turn.firstLetter} player={this.props.turn.activePlayer} blank={true} />;
      turns.push(currentTurn);
    }
    
    return turns;
  }
  
  render() {
    return (
      <ul ref={this.listRef} className="turns">
        {this.renderTurns()}
      </ul>
    );
  }
}

export default TurnsList;