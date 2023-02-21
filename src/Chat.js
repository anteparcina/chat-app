import {Component} from "react";
import React from "react";

class Chat extends Component {
  render() {
    const {messages} = this.props;
    return (
      <ul className="Chat-list">
        {messages.map(m => this.renderMessage(m))}
      </ul>
    );
  }

  renderMessage(message) {
    const {member, text} = message;
    const {currentMember} = this.props;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe ? "Chat-message currentMember" : "Chat-message";
    return (
      <li className={className} key={member.clientData.username}>
      <span className="circle" style={{backgroundColor: member.clientData.color}}/>
        <div className="Chat-content">
          <div className="username">
            {member.clientData.username}
          </div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  }
}

export default Chat;