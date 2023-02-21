import {Component} from "react";
import React from "react";

class Input extends Component {
  state = { text: "" }

  onChange(e) { this.setState({text: e.target.value}); }

  onSubmit(e) {
    e.preventDefault();
    if(!e.target[0].value){
      alert ("You need to type something");
    }
    else{
    this.setState({text: ""});
    this.props.onSendMessage(this.state.text);
    }
  }

  render() {
    return (
      <div className="Input">
        <form onSubmit={e => this.onSubmit(e)}>
          <input onChange={e => this.onChange(e)} value={this.state.text} type="text" placeholder="Type something" autoFocus={true}/>
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default Input;