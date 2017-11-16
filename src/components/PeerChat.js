import React, { Component } from "react";

import { onDataReceive } from "../services/peer/index";

class PeerChat extends Component {
  constructor(props) {
    super(props);

    onDataReceive(this.props.peer, this.onTextReceive);

    this.state = {
      text: ""
    };
  }

  onTextReceive = text => {
    this.setState({ text });
  };

  onTextChange = e => {
    const text = e.target.value;

    this.setState({ text });
    this.props.peer.send(text);
  };

  render() {
    return (
      <textarea
        className="textarea"
        value={this.state.text}
        onChange={this.onTextChange}
      />
    );
  }
}

export default PeerChat;
