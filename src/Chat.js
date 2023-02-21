import {Component} from "react";
import React from "react";

class Chat extends Component {
  render() {
    const {messages} = this.props;
    return (
      <ul className="Chat-list">
        {messages.map((m, i) => this.renderMessage(m, i))}
      </ul>
    );
  }

  renderMessage(message, i) {
    const {member, text} = message;
    const {currentMember} = this.props;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe ? "Chat-message currentMember" : "Chat-message";
    return (
      <li className={className} key={member.clientData.username + "-" + i}>
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