import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.props.onButtonClick();
  }
  
  render() {
    const gameStarted = !this.props.gameStarted ? "modal_show" : "";
    
    return (
      <div className={`modal ${gameStarted}`}>
        <div className="modal-content">
          <h2 className="modal__title">Привет!</h2>
          <p className="modal__description">Правила очень простые — называй реально существующие города на последнюю букву города, который сыграл компьютер.</p>
          <button className="modal__button" type="button" onClick={this.handleClick}>Окей!
          </button>
        </div>
      </div>
    );
  }
}

export default Modal;