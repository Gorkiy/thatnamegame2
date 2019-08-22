import React, { Component } from 'react';
import UserInput from '../UserInput/UserInput';
import Modal from '../Modal/Modal';
import Scoreboard from '../Scoreboard/Scoreboard';
import TurnsList from '../TurnsList/TurnsList';
import Computer from '../../Utils/Computer';
import './App.css';

let comp = new Computer('ru');
const gameConfig = {
  turnLimit: 30,
  cityValue: {'0': 3, '1': 1, '2': 2}
}

class App extends Component {
  state = {
    gameStarted: false,
    gameEnded: false,
    turn: {
      activePlayer: 'computer',
      firstLetter: ''
    },
    playedCities: [],
    turnNumber: 0,
    timeLeft: gameConfig.turnLimit,
    score: 0,
    timer: null,
    message: ''
  }
  
  componentDidMount() {
  }
  
  onFormSubmit = (guess) => {
    this.setState({ message: '' });
    const cityOptions = this.formatGuess(guess);
    
    if (this.state.turn.activePlayer === 'human') {
      if (guess[0].toUpperCase() === this.state.turn.firstLetter) {
        
        for (let option of cityOptions) {
          if (comp.alreadyPlayed.has(option)) {
            this.setState({ message: `Город ${option} уже был сыгран в этом матче. Повторяться нельзя!`});
            // console.log(`Город ${option} уже был сыгран в этом матче. Повторяться нельзя!`);
            return;
            // Checks if passed guess is a valid city. If so, save city object to comp.recentTurn.city
          } else if (comp.checkUserInput(option)) {
            clearInterval(this.timer);
            this.makeTurn('human');
            return option;
          } 
        }
        this.setState({ message: `Не знаю города ${guess}!`});
        // console.log(`Не знаю города ${guess}!`);
        
      } else {
        this.setState({ message: 'Город должен начинаться на букву ' + this.state.turn.firstLetter });
        // console.log('Город должен начинаться на букву ' + this.state.turn.firstLetter);
      }
    }
  }
  
  onButtonClick = async () => {
    // if (!this.state.gameStarted) {
    // 
    // }
    comp = new Computer('ru');
    await this.setState({ gameStarted: true });
    await this.setState({ gameEnded: false });
    await this.setState({ playedCities: [] });
    await this.setState({ turnNumber: 0 });
    await this.setState({ score: 0 });
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
      this.incrementScore(recentTurn.size);
      await this.updateGameState('human', recentTurn);
      this.makeTurn('computer');
    }
  }
  
  runTimer() {
    this.setState({ timeLeft: gameConfig.turnLimit });
    
    this.timer = setInterval(function() {
      this.setState({ timeLeft: this.state.timeLeft - 1 });
      if (this.state.timeLeft <= 0) {
        clearInterval(this.timer);
        this.setState({ gameEnded: true});
      }
    }.bind(this), 1000);
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
    
    if (nextPlayer === 'human') {
      this.setState({ message: `Нужно сыграть любой город на ${this.state.turn.firstLetter}`});
      this.runTimer();
    }
    
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
  
  incrementScore(citySize) {
    let score = this.state.score;
    
    switch(citySize) {
      case 0: 
        score += gameConfig.cityValue[citySize];
        break;
      case 2:
        score += gameConfig.cityValue[citySize];
        break;
      default:
        score += 1;
    }
    this.setState({ score });
    // console.log(this.state.score);
  }
  
  render() {
    return (
      <div className="game-wrapper">
        <Modal gameStarted={this.state.gameStarted} gameEnded={this.state.gameEnded} score={this.state.score} onButtonClick={this.onButtonClick}/>
        <Scoreboard turn={this.state.turnNumber} score={this.state.score} timeLeft={this.state.timeLeft}/>
        <TurnsList turn={this.state.turn} playedCities={this.state.playedCities} gameEnded={this.state.gameEnded} />
        <UserInput firstLetter={this.state.turn.firstLetter} player={this.state.turn.activePlayer} message={this.state.message} onSubmit={this.onFormSubmit}/>
      </div>
    );
  }
}

export default App;
