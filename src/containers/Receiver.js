import React, { Component } from "react";

import { initialize, offerToHash, hashToOffer } from "../services/peer";
import {
  bindToSocket,
  joinRoom,
  broadcastOfferToSocket
} from "../services/signaling";
import PeerChat from "../components/PeerChat";
import SocketProvider from "../components/SocketProvider";

class Receiver extends Component {
  constructor(props) {
    super(props);

    this.roomId = props.match.params.roomId;
    this.peer = initialize(false, this.onPeerOffer, this.onPeerConnected);

    bindToSocket(props.socket, {
      onReady: this.onSocketReady,
      onReceived: this.onOfferAnswerReceivedFromSocket
    });

    this.state = {
      connected: false
    };
  }

  onPeerOffer = offer => {
    broadcastOfferToSocket(this.props.socket, offerToHash(offer), this.roomId);
  };

  onPeerConnected = () => {
    this.setState({ connected: true });
    alert("You are now connected");
  };

  onSocketReady = () => {
    joinRoom(this.props.socket, this.roomId);
  };

  onOfferAnswerReceivedFromSocket = answer => {
    console.log(answer);
    this.peer.signal(hashToOffer(answer));
  };

  render() {
    if (this.state.connected) {
      return <PeerChat peer={this.peer} />;
    }

    return (
      <SocketProvider>
        <div className="notification">
          <div>Connecting to your partner...</div>
        </div>
      </SocketProvider>
    );
  }
}

export default Receiver;
