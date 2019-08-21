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
      if (prevProps.firstLetter !== this.props.firstLetter) {
        this.setState({ guess: this.props.firstLetter });
      }
      this.focusInput();
    }
  }
  
  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.guess);
    console.log(this.props);
  }
  
  focusInput() {
    this.inputRef.current.focus();
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
        </form>
      </div>
    );
  }
}

export default UserInput;