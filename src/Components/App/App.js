import React, { Component } from 'react';
import UserInput from '../UserInput/UserInput';
import Modal from '../Modal/Modal';
import Scorebar from '../Scorebar/Scorebar';
import TurnsList from '../TurnsList/TurnsList';
import Message from '../Message/Message';
import Computer from '../../Utils/Computer';
import './App.css';

let comp = new Computer('ru');
const gameConfig = {
  turnLimit: 60,
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
    message: {
      code: 0,
      value: null,
      id: 0
    },
    isAccepted: false
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
            this.setState({ isAccepted: false });
          }.bind(this), 2000)
        );
      });
    } else if (player === 'human') {
      this.setState({ isAccepted: true });
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
      this.setState({ message: { 
        code: 3,
        value: this.state.turn.firstLetter,
        id: this.state.message.id + 1
      }});
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
        this.setState({ gameStarted: false});
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
  }
  
  validateFirstLetter(firstLetter) {
    if (firstLetter === this.state.turn.firstLetter) return true;
    
    if (this.state.turn.firstLetter === 'И' || this.state.turn.firstLetter === 'Й') {
      if (firstLetter === 'И' || firstLetter === 'Й') {
        return true;
      }
    }
    
    if (this.state.turn.firstLetter === 'Ш' || this.state.turn.firstLetter === 'Щ') {
      if (firstLetter === 'Ш' || firstLetter === 'Щ') {
        return true;
      }
    }
    return false;
  }
  
  onFormSubmit = (guess) => {
    if (!guess.length) return;
    this.setState({ message: { code: 0, value: null, id: this.state.message.id }});
    const cityOptions = this.formatGuess(guess);
    
    if (this.state.turn.activePlayer === 'human') {
        if (this.validateFirstLetter(guess[0].toUpperCase())) {
          for (let option of cityOptions) {
            if (comp.alreadyPlayed.has(option)) {
              this.setState({ message: { 
                code: 1,
                value: option,
                id: this.state.message.id + 1
              }});
              return;
            } else if (comp.checkUserInput(option)) {
              clearInterval(this.timer);
              this.makeTurn('human');
              return option;
            } 
          }
          this.setState({ message: { 
            code: 2,
            value: guess,
            id: this.state.message.id + 1
          }});
      } else {
        this.setState({ message: { 
          code: 3,
          value: this.state.turn.firstLetter,
          id: this.state.message.id + 1
        }});
      }
    }
  }
  
  onButtonClick = async () => {
    comp = new Computer('ru');
    await this.setState({ gameStarted: true });
    await this.setState({ gameEnded: false });
    await this.setState({ playedCities: [] });
    await this.setState({ turnNumber: 0 });
    await this.setState({ score: { human: 0, computer: 0 }});
    await this.setState({ turn: { activePlayer: 'computer', firstLetter: '' }});
    await this.setState({ message: { code: 0, value: null, id: this.state.message.id }});
    this.makeTurn('computer');
  }
  
  render() {
    return (
      <div className="game-wrapper">
        <Modal gameStarted={this.state.gameStarted} gameEnded={this.state.gameEnded} score={this.state.score} onButtonClick={this.onButtonClick}/>
        <Scorebar turn={this.state.turnNumber} score={this.state.score} timeLeft={this.state.timeLeft}/>
        <TurnsList turn={this.state.turn} turnNumber={this.state.turnNumber} playedCities={this.state.playedCities} gameStarted={this.state.gameStarted} gameEnded={this.state.gameEnded}/>
        { !this.state.gameEnded ? <Message message={this.state.message} gameEnded={this.state.gameEnded} isAccepted={this.state.isAccepted}/> : '' }
        <UserInput firstLetter={this.state.turn.firstLetter} player={this.state.turn.activePlayer}  gameEnded={this.state.gameEnded} onSubmit={this.onFormSubmit}/>
      </div>
    );
  }
}

export default App;
