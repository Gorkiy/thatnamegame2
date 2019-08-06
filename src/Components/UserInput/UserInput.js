import React, { Component } from 'react';
import './UserInput.css';

class UserInput extends Component {
  state = { term: '' }
  
  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.term);
  }
  
  render() {
    return (
      <div className="input-bar">
        <form className="input-bar__form" onSubmit={this.onFormSubmit}>
          <input className="input-bar__text" type="text" value={this.state.term} 
          onChange={(e) => this.setState({ term: e.target.value })} />
        </form>
      </div>
    );
  }
}

export default UserInput;