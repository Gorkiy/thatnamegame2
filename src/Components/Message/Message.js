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
    this.state = { timer: null };
    this.msgRef = React.createRef();
    
  }

  componentDidUpdate(prevProps) {
    
    // if (this.msgRef.current)  {
    //   setTimeout(function() {
    //     this.msgRef.current.classList.add('visually-hidden');
    //       // this.msgRef.current.remove();
    //   }.bind(this), 3000);
    // }
    // if (prevProps.messageCode.code !== this.props.messageCode.code && this.props.messageCode.code !== 0) {
    //   this.runTimer();
    // }
  }
  
  runTimer() {
  
    this.timer = setTimeout(function() {
      this.msgRef.current.classList.add('visually-hidden');
  
      if (this.props.messageCode.code === 0 || this.props.isAccepted) {
        clearInterval(this.timer);
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
    
    if (this.props.messageCode.code) {
      switch(this.props.messageCode.code) {
        case 1:
          msg = <React.Fragment>
            Город <span className="guess__accent">{this.props.messageCode.value}</span> уже был сыгран в этом матче.
          </React.Fragment>
          break;
        case 2:
          msg = <React.Fragment>
            Не знаю города <span className="guess__accent">{this.props.messageCode.value}</span>
          </React.Fragment>
          break;
        case 3:
          let lastLetters = [];
          if (this.props.messageCode.value === 'И' || this.props.messageCode.value === 'Й') {
            lastLetters = ['И', 'Й'];
          }
          if (this.props.messageCode.value === 'Ш' || this.props.messageCode.value === 'Щ') {
            lastLetters = ['Ш', 'Щ'];
          }
          
          if (!lastLetters.length) {
            msg = <React.Fragment>
              Нужно сыграть город на <span className="guess__accent">{this.props.messageCode.value}</span>
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
      // this.msgRef.current.classList.add('123');
      // console.log(this.msgRef.current);
      
      // setTimeout(function() {
      //   messageElement.remove();
      // }.bind(this), 3000);
      // this.msgRef.current.classList.remove('visually-hidden');
      // clearInterval(this.timer);
      
      
      // this.runTimer();
      
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