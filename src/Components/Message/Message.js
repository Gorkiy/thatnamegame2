import React, { Component } from 'react';
import './Message.css';

const acceptedMessages = [
  'Океюшки!',
  'Красивая у них площадь в центре!',
  'Очень хорошо!',
  'Компьютера не обыграешь!',
  'Кофе у них так себе.',
  'Вот бы туда сгонять на выходные!'
]

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = { isShown: false };
    this.msgRef = React.createRef();
    this.timer = null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.message.id !== this.props.message.id && !this.props.gameEnded) {
      this.setState({ isShown: true });
      this.msgRef.current.classList.remove('visually-hidden');
      this.runTimer(this.props.message.id);
    }
  }
  
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  
  runTimer(id) {
    this.timer = setTimeout(function() {
      this.setState({ isShown: false });
      this.msgRef.current.classList.add('visually-hidden');
      if (id !== this.props.message.id || this.props.gameEnded) {
        clearTimeout(this.timer);
        this.setState({ isShown: true });
        this.msgRef.current.classList.remove('visually-hidden');
      }
    }.bind(this), 5000);
  }
  
  renderMsg() {
    if (this.props.gameEnded) return;
    let msg, messageElement;
    
    if (this.props.isAccepted) {
      let displayChance = Math.random() * 100;
      
      if (displayChance > 66) {
        msg = acceptedMessages[Math.floor(Math.random() * acceptedMessages.length)];
        return <p className="guess__message">{msg}</p>;
      }
    }
    
    if (this.props.message.code) {
      switch(this.props.message.code) {
        case 1:
          msg = <React.Fragment>
            Город <span className="guess__accent">{this.props.message.value}</span> уже был сыгран в этом матче.
          </React.Fragment>
          break;
        case 2:
          msg = <React.Fragment>
            Не знаю города <span className="guess__accent">{this.props.message.value}</span>
          </React.Fragment>
          break;
        case 3:
          let lastLetters = [];
          if (this.props.message.value === 'И' || this.props.message.value === 'Й') {
            lastLetters = ['И', 'Й'];
          }
          if (this.props.message.value === 'Ш' || this.props.message.value === 'Щ') {
            lastLetters = ['Ш', 'Щ'];
          }
          
          if (!lastLetters.length) {
            msg = <React.Fragment>
              Нужно сыграть город на <span className="guess__accent">{this.props.message.value}</span>
            </React.Fragment>
          } else {
            
            msg = <React.Fragment>
              Нужно сыграть город на <span className="guess__accent">{lastLetters[0]}</span> или <span className="guess__accent">{lastLetters[1]}</span>
            </React.Fragment>
          }
          break;
        default:
          msg = "";
      }
      
      messageElement = <p className="guess__message">{msg}</p>;
      return messageElement;
    }
  }
  
  render() {
    return (
      <div className="guess__msg-wrapper" ref={this.msgRef}>
        {this.renderMsg()}
      </div>
    );
  }
}

export default Message;