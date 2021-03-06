import React, { Component } from 'react';
import posed from 'react-pose';
import './Modal.css';

const ModalBox = posed.div({
  enter: {
    y: '-50%',
    x: '-50%',
    scale: 1,
    opacity: 1,
    transition: {
      scale: { type: 'spring', stiffness: 500, damping: 15 },
      default: { duration: 300 }
    }
  },
  exit: {
    y: '-50%',
    x: '-50%',
    scale: 1.5,
    opacity: 0,
    transition: { duration: 150 }
  }
});

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isNewRecord: false,
      isShown: false
     };
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentDidMount() {
    this.setState({ isShown: true });
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.gameEnded !== this.props.gameEnded && this.props.gameEnded) {
      this.setState({ isShown: true });
      if (this.defineRecord()) this.setState({ isNewRecord: true });
    }
  }

  handleClick() {
    this.props.onButtonClick();
    this.setState({ isNewRecord: false });
    this.setState({ isShown: false });
  }
  
  getContent() {
    if (this.props.gameEnded) {
      let recordPart = this.state.isNewRecord ? 'Это, на секундочку, новый рекорд!' : '';
      let pointsPart = this.defineWordEnding(this.props.score.human);
      
      
      if (this.props.score.human >= this.props.finalScore) {
        return {
          title: 'Очень эпично!',
          description: `Победа! Тебе удалось набрать ${this.props.finalScore} баллов в "Города" быстрее компьютера. Совпадение?`,
          buttonText: 'Не думаю.'
        }
      } else if (this.props.score.computer >= this.props.finalScore) {
        return {
          title: 'Это фиаско.',
          description: `Хорошая попытка, но компьютер набрал ${this.props.finalScore} баллов быстрее.`,
          buttonText: 'Сейчас победим!'
        }
      } else {
        return {
          title: 'Все, приехали!',
          description: <React.Fragment>Я насчитал <strong>{this.props.score.human}</strong> балл{pointsPart}. {recordPart}<br/>
          Желтая кнопка ниже приглашает повторить.</React.Fragment>,
          buttonText: 'Еще разок.'
        }
      }
    }
    
    return {
      title: 'Новая игра',
      description: <React.Fragment>Правила очень простые — называй реально существующие города на последнюю букву города, который сыграл компьютер. <br /><br />
      <strong>Например</strong>: Москва 👉 Амстердам 👉 Мюнхен <br /><br /> Для победы достаточно набрать {this.props.finalScore} баллов быстрее компьютера.</React.Fragment>,
      buttonText: 'Понятно.'
    }
  }
  
  defineRecord() {
    const matchScore = this.props.score.human;
    let bestScore = 0;
    
    if (!localStorage.getItem('bestScore')) {
      localStorage.setItem('bestScore', matchScore);
    } else {
      bestScore = Number(localStorage.getItem('bestScore'));
      
      if (matchScore > bestScore) localStorage.setItem('bestScore', matchScore);
    }
    return matchScore > bestScore;
  }
  
  defineWordEnding(num) {
    if (num % 100 >= 11 && num % 100 <= 19) return 'ов';
    if (num % 10 === 1) return '';
    if (num % 10 >= 2 && num % 10 <= 4) return 'а';
    return 'ов';
  }
  
  render() {
    const gameStarted = !this.props.gameStarted || this.props.gameEnded ? 'modal_show' : '';
    const isShown = this.state.isShown ? true : false;
        
    return (
      <div className={`modal ${gameStarted}`}>
        <ModalBox className="modal-content" pose={isShown ? 'enter' : 'exit'} >
          <h2 className="modal__title">{this.getContent().title}</h2>
          <p className="modal__description">{this.getContent().description}</p>
          <button className="modal__button" type="button" onClick={this.handleClick}>{this.getContent().buttonText}
          </button>
          </ModalBox>
      </div>
    );
  }
}

export default Modal;