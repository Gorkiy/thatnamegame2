import React, { Component } from 'react';
import UserInput from '../UserInput/UserInput';
import Modal from '../Modal/Modal';
import TurnsList from '../TurnsList/TurnsList';
import Computer from '../../Utils/Computer';
import './App.css';

const comp = new Computer('ru');

class App extends Component {
  state = {
    gameStarted: false,
    gameEnded: false,
    turn: {
      activePlayer: 'computer',
      firstLetter: ''
    },
    playedCities: [],
    turnNumber: 0
  }
  
  componentDidMount() {
  }
  
  onFormSubmit = (guess) => {
    const cityOptions = this.formatGuess(guess);
    
    if (this.state.turn.activePlayer === 'human') {
      if (guess[0].toUpperCase() === this.state.turn.firstLetter) {
        
        for (let option of cityOptions) {
          if (comp.alreadyPlayed.has(option)) {
            console.log(`Город ${option} уже был сыгран в этом матче. Повторяться нельзя!`);
            return;
            // Checks if passed guess is a valid city. If so, save city object to comp.recentTurn.city
          } else if (comp.checkUserInput(option)) {
            this.makeTurn('human');
            return option;
          } else {
            console.log(`Не знаю города ${option}!`);
          }
        }
      } else {
        console.log('Город должен начинаться на букву ' + this.state.turn.firstLetter);
      }
    }
  }
  
  onButtonClick = () => {
    this.setState({ gameStarted: true });
    this.makeTurn('computer');
  }
  
  async makeTurn(player) {
    await this.setState({ turnNumber: this.state.turnNumber + 1 });
    
    if (player === 'computer') {
      const answer = comp.answer(this.state.turn.firstLetter);
      await new Promise((resolve, reject) => {
        resolve(
          setTimeout(function() {
          this.updateGameState('computer', answer);
          }.bind(this), 2000)
        );
      });
    } else if (player === 'human') {
      const recentTurn = comp.recentTurn.city;
      await this.updateGameState('human', recentTurn);
      this.makeTurn('computer');
    }
  }
  
  updateGameState(player, cityObj) {
    const nextPlayer = player === 'human' ? 'computer' : 'human';
    cityObj.player = player;
    cityObj.turnNumber = this.state.turnNumber;
    
    this.markCityAsPlayed(cityObj);
    this.setState({ turn: {
      activePlayer: nextPlayer,
      firstLetter: comp.recentTurn.lastLetter
      }
    });
  }
  
  formatGuess(guess) {
    let options = [];
    
    let city = guess.trim();
    city = city[0].toUpperCase() + city.slice(1);
    city = city.replace(/\s+/g, ' ');
    city = city.replace(/[^а-яА-Я- ]/g, '');
    options.push(city);
    
    if (/ /g.test(city)) {
      const copy = city;
      const cityWithDashes = copy.replace(/ /g, '-');
      const cityWithNoSpaces = copy.replace(/ /g, '');
      options.push(cityWithDashes);
      options.push(cityWithNoSpaces);
    }
    console.log(options);
    return options;
  }
  
  markCityAsPlayed(cityObj) {
    const played = this.state.playedCities.slice();
    played.push(cityObj);
    this.setState({ playedCities: played });
  }
  
  render() {
    return (
      <div className="game-wrapper">
        <Modal gameStarted={this.state.gameStarted} onButtonClick={this.onButtonClick}/>
        <UserInput firstLetter={this.state.turn.firstLetter} player={this.state.turn.activePlayer} onSubmit={this.onFormSubmit}/>
        <TurnsList turn={this.state.turn} playedCities={this.state.playedCities} gameEnded={this.state.gameEnded} />
      </div>
    );
  }
}

export default App;
