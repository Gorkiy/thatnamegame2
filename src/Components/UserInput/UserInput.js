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
  }
  
  focusInput() {
    this.inputRef.current.focus();
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
      <div className="input-bar">
        <form className="input-bar__form" onSubmit={this.onFormSubmit}>
          <input className="input-bar__text" type="text" ref={this.inputRef} value={this.state.guess} 
          onChange={this.handleChange} />
          <p className="input-bar__message">{this.props.message}</p>
        </form>
      </div>
    );
  }
}

export default UserInput;