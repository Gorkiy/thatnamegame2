import React, { Component } from 'react';
import Turn from '../Turn/Turn';
import './TurnsList.css';

class TurnsList extends Component {
  
  renderTurns() {
    console.log(this.props);
    // const turns = [];
    // 
    // for (let cityObj of this.props.playedCities) {
    //   console.log(cityObj);
    //   let turn = <Turn key={cityObj.turnNumber} city={cityObj.city} country={cityObj.country} player={cityObj.player} />;
    //   turns.push(turn);
    // }
    
    const turns = this.props.playedCities.map(cityObj => {
      return <Turn key={cityObj.turnNumber} city={cityObj.city} country={cityObj.country} player={cityObj.player} />;
    })
    
    
    if (!this.props.gameEnded) {
      let currentTurn = <Turn key={this.props.turnNumber + 1} firstLetter={this.props.turn.firstLetter} player={this.props.turn.activePlayer} blank={true} />;
      turns.push(currentTurn);
    }
    
    return turns;
  }
  
  render() {
    return (
      <ul className="turns">
        {this.renderTurns()}
      </ul>
    );
  }
}

export default TurnsList;