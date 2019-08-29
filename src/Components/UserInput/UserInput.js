import React, { Component } from 'react';
import './UserInput.css';

class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = { guess: '' };
    this.inputRef = React.createRef();
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
    if (this.props.message) {
      return <p className="guess__message">{this.props.message}</p>
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
          onChange={this.handleChange} />
          <button className="guess__button" type="submit"></button>
          <div className="guess__msg-wrapper">
            {this.renderMsg()}
          </div>
        </form>
      </div>
    );
  }
}

export default UserInput;