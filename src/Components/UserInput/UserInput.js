import React, { Component } from 'react';
import './UserInput.css';

class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = { guess: '' };
    this.inputRef = React.createRef();
    this.msgRef = React.createRef();
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.player === 'human') {
      if (prevProps.player !== this.props.player) {
        this.setState({ guess: this.props.firstLetter });
      }
      this.inputRef.current.disabled = false;
      this.focusInput();
    } else {
      this.inputRef.current.disabled = true;
    }
    
    if (prevProps.gameEnded !== this.props.gameEnded && this.props.gameEnded) {
      // this.inputRef.current.disabled = true;
      this.inputRef.current.blur();
      this.setState({ guess: '' });
    }    
  }
  
  focusInput() {
    this.inputRef.current.focus();
  }
  
  renderMsg() {
    let msg;
    
    if (this.props.messageCode.code) {
      switch(this.props.messageCode.code) {
        case 1:
          msg = (
            <p className="guess__message guess__message--error">
              Город <span className="guess__accent">{this.props.messageCode.value}</span> уже был сыгран в этом матче.
            </p>
          );
          break;
        case 2:
          msg = (
            <p className="guess__message guess__message--error">
              Не знаю города <span className="guess__accent">{this.props.messageCode.value}</span>
            </p>
          );
          break;
        case 3:
          let lastLetters = [];
          if (this.props.messageCode.value === 'И' || this.props.messageCode.value === 'Й') {
            lastLetters = ['И', 'Й'];
          }
          if (this.props.messageCode.value === 'Ш' || this.props.messageCode.value === 'Щ') {
            lastLetters = ['Ш', 'Щ'];
          }
          
          if (!lastLetters.length) {
            // let text = `Нужно сыграть город на <span class="guess__accent">${this.props.messageCode.value}</span>`;
            // let element = `<p class="guess__message"> ${text} </p>`;
            // this.msgRef.current.innerHTML = element;
            msg = (
              <p className="guess__message">
                Нужно сыграть город на <span className="guess__accent">{this.props.messageCode.value}</span>
              </p>
            );
          } else {
            msg = (
              <p className="guess__message">
                Нужно сыграть город на <span className="guess__accent">{lastLetters[0]}</span> или <span className="guess__accent">{lastLetters[1]}</span>
              </p>
            );
          }
          break;
        default:
          msg = "";
      }
    }
    return msg;
  }
  
  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.guess);
  }
  
  handleChange = (e) => {
    this.setState({ guess: e.target.value });
  }
  
  render() {
    return (
      <div className="guess">
        <form className="guess__form" onSubmit={this.onFormSubmit}>
          <input className="guess__input" type="text" ref={this.inputRef} value={this.state.guess} 
          onChange={this.handleChange} />
          <button className="guess__button" type="submit"></button>
          <div className="guess__msg-wrapper" ref={this.msgRef}>
            {this.renderMsg()}
          </div>
        </form>
      </div>
    );
  }
}

export default UserInput;