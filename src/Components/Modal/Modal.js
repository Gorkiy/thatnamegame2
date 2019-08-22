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
  
  getContent() {
    if (this.props.gameEnded) {
      return {
        title: 'Game Over',
        description: `Ваш финальный счет ${this.props.score} очков`,
        buttonText: 'Новая игра'
      }
    }
    
    return {
      title: 'Новая игра',
      description: 'Правила очень простые — называй реально существующие города на последнюю букву города, который сыграл компьютер.',
      buttonText: 'Окей!'
    }
  }
  
  render() {
    const gameStarted = !this.props.gameStarted || this.props.gameEnded ? "modal_show" : "";
    
    return (
      <div className={`modal ${gameStarted}`}>
        <div className="modal-content">
          <h2 className="modal__title">{this.getContent().title}</h2>
          <p className="modal__description">{this.getContent().description}</p>
          <button className="modal__button" type="button" onClick={this.handleClick}>{this.getContent().buttonText}
          </button>
        </div>
      </div>
    );
  }
}

export default Modal;