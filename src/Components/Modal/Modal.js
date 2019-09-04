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
      let recordPart = this.defineRecord() ? 'Это, на секундочку, новый рекорд!' : '';
      let pointsPart = this.defineWordEnding(this.props.score.human);

      return {
        title: 'Все, приехали!',
        description: <React.Fragment>Я насчитал <strong>{this.props.score.human}</strong> балл{pointsPart}. {recordPart}<br/>
        Желтая кнопка ниже приглашает повторить.</React.Fragment>,
        buttonText: 'Еще разок.'
      }
    }
    
    return {
      title: 'Новая игра',
      description: <React.Fragment>Правила очень простые — называй реально существующие города на последнюю букву города, который сыграл компьютер. <br /><br />
      <strong>Например</strong>: Москва 👉 Амстердам 👉 Мюнхен <br /><br /> P.S. Кстати, у компьютера выиграть невозможно, поэтому не расстраивайся.</React.Fragment>,
      buttonText: 'Понятно.'
    }
  }
  
  defineRecord() {
    const matchScore = this.props.score.human;
    let bestScore = -Infinity;
    
    if (!localStorage.getItem('bestScore')) {
      localStorage.setItem('bestScore', matchScore);
    } else {
      bestScore = Number(localStorage.getItem('bestScore'));
    }
    return matchScore > bestScore;
  }
  
  defineWordEnding(num) {
    if (num % 100 === 11) return 'ов';
    if (num % 10 === 1) return '';
    if (num % 10 >= 2 && num % 10 <= 4) return 'а';
    return 'ов';
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