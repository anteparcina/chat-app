import React, { Component } from 'react';
import './App.css';
import Chat from "./Chat";
import Input from "./Input";

function randomClub() {
  const clubs = ["Arsenal", "Man. City", "Man. Utd.", "Tottenham", "Newcastle", "Fulham", "Brighton", "Liverpool", "Brentford", "Chelsea", "Aston Villa", "Crystal Palace", "Nottingham Forest", "Leicester", "Wolves", "Everton", "Bournemouth", "West Ham", "Leeds", "Southampton"];
  const club = clubs[Math.floor(Math.random() * clubs.length)];
  return club;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}
class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomClub(),
      color: randomColor(),
    }
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone("aeUyW6RBOnD80lTv", {data: this.state.member});
  }

  componentDidMount() {
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data}); 
      this.setState({messages});
    });
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-top">
          <h1>Premiership chat</h1>
        </div>
        <Chat messages={this.state.messages} currentMember={this.state.member} />
        <Input onSendMessage={this.onSendMessage}/>
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

}

export default App;