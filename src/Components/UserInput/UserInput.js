import React, { Component } from 'react';
import './UserInput.css';

class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = { guess: '' };
    this.inputRef = React.createRef();
    this.buttonRef = React.createRef();
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.player === 'human' && !this.props.gameEnded) {
      if (prevProps.player !== this.props.player) {
        this.inputRef.current.disabled = false;
        this.buttonRef.current.disabled = false;
        if (!this.props.gameEnded) this.inputRef.current.focus();
        this.setState({ guess: this.props.firstLetter });
      }
    } else {
      this.inputRef.current.disabled = true;
      this.buttonRef.current.disabled = true;
    }
    
    if (prevProps.gameEnded !== this.props.gameEnded && this.props.gameEnded) {
      this.inputRef.current.blur();
      this.setState({ guess: '' });
      this.inputRef.current.disabled = true;
      this.buttonRef.current.disabled = true;
    }    
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
          onChange={this.handleChange} aria-label="Введите город" />
          <button className="guess__button" type="submit" ref={this.buttonRef} aria-label="Город (версия)"></button>
        </form>
      </div>
    );
  }
}

export default UserInput;