import React, { Component } from 'react';
import UserInput from '../UserInput/UserInput';
import Modal from '../Modal/Modal';
import Scorebar from '../Scorebar/Scorebar';
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
    score: {
      human: 0,
      computer: 0
    },
    turnScore: null,
    timer: null,
    message: ''
  }

  async makeTurn(player) {
    if (player === 'computer') {
      await this.setState({ turnNumber: this.state.turnNumber + 1 });
      const answer = comp.answer(this.state.turn.firstLetter);
      await new Promise((resolve, reject) => {
        resolve(
          setTimeout(function() {
            this.incrementScore('computer', answer.size);
            this.updateGameState('computer', answer);
            this.setState({ turnNumber: this.state.turnNumber + 1 });
          }.bind(this), 2000)
        );
      });
    } else if (player === 'human') {
      const recentTurn = comp.recentTurn.city;
      await this.incrementScore('human', recentTurn.size);
      await this.updateGameState('human', recentTurn);
      this.makeTurn('computer');
    }
  }

  updateGameState(player, cityObj) {
    const nextPlayer = player === 'human' ? 'computer' : 'human';
    cityObj.player = player;
    cityObj.turnNumber = this.state.turnNumber;
    cityObj.turnScore = this.state.turnScore;
    
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
    return options;
  }
  
  markCityAsPlayed(cityObj) {
    const played = this.state.playedCities.slice();
    played.push(cityObj);
    this.setState({ playedCities: played });
  }
  
  incrementScore(player, citySize) {
    const score = {...this.state.score};
    let turnScore = NaN;
  
    switch(citySize) {
      case 0: 
        turnScore = gameConfig.cityValue[citySize];
        score[player] += turnScore;
        break;
      case 2:
        turnScore = gameConfig.cityValue[citySize];
        score[player] += turnScore;
        break;
      default:
        turnScore = 1;
        score[player] += turnScore;
    }
    this.setState({ turnScore });
    this.setState({ score });
    // return turnScore;
  }
  
  onFormSubmit = (guess) => {
    this.setState({ message: '' });
    const cityOptions = this.formatGuess(guess);
    
    if (this.state.turn.activePlayer === 'human') {
      if (guess[0].toUpperCase() === this.state.turn.firstLetter) {
        
        for (let option of cityOptions) {
          if (comp.alreadyPlayed.has(option)) {
            this.setState({ message: `Город ${option} уже был сыгран в этом матче. Повторяться нельзя!`});
            return;
          } else if (comp.checkUserInput(option)) {
            clearInterval(this.timer);
            this.makeTurn('human');
            return option;
          } 
        }
        this.setState({ message: `Не знаю города ${guess}!`});
      } else {
        this.setState({ message: 'Город должен начинаться на букву ' + this.state.turn.firstLetter });
      }
    }
  }
  
  onButtonClick = async () => {
    //Reset setting and init new game
    comp = new Computer('ru');
    await this.setState({ gameStarted: true });
    await this.setState({ gameEnded: false });
    await this.setState({ playedCities: [] });
    await this.setState({ turnNumber: 0 });
    await this.setState({ 
      score: {
        human: 0,
        computer: 0
      } 
    });
    await this.setState({
      turn: {
        activePlayer: 'computer',
        firstLetter: ''
      }
    })
    this.makeTurn('computer');
  }
  
  render() {
    return (
      <div className="game-wrapper">
        <Modal gameStarted={this.state.gameStarted} gameEnded={this.state.gameEnded} score={this.state.score} onButtonClick={this.onButtonClick}/>
        <Scorebar turn={this.state.turnNumber} score={this.state.score} timeLeft={this.state.timeLeft}/>
        <TurnsList turn={this.state.turn} turnNumber={this.state.turnNumber} playedCities={this.state.playedCities} gameEnded={this.state.gameEnded} />
        <UserInput firstLetter={this.state.turn.firstLetter} player={this.state.turn.activePlayer} message={this.state.message} gameEnded={this.state.gameEnded} onSubmit={this.onFormSubmit}/>
      </div>
    );
  }
}

export default App;
