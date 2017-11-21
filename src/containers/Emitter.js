import React, { Component } from "react";
import uuid from "uuid/v4";

import { initialize, offerToHash, hashToOffer } from "../services/peer";
import {
  bindToSocket,
  joinRoom,
  broadcastOfferToSocket
} from "../services/signaling";
import PeerChat from "../components/PeerChat";
import CopyClipboard from "../components/CopyClipboard";

class Emitter extends Component {
  constructor(props) {
    super(props);

    this.roomId = uuid();
    this.peer = null;

    bindToSocket(props.socket, {
      onReady: this.onSocketReady,
      onArrival: this.onReceiverArrival,
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

  onReceiverArrival = () => {
    this.peer = initialize(true, this.onPeerOffer, this.onPeerConnected);
  };

  onOfferAnswerReceivedFromSocket = answer => {
    this.peer.signal(hashToOffer(answer));
  };

  render() {
    if (this.state.connected) {
      return <PeerChat peer={this.peer} />;
    }

    const offerLink = `${window.location.href}r/${this.roomId}`;

    return (
      <div>
        <div className="notification">
          <div className="field">
            Click on the button and send the link to your partner. It will
            generate a personal hash for him.
          </div>
          <div className="field">
            <CopyClipboard value={offerLink} />
          </div>
        </div>
      </div>
    );
  }
}

export default Emitter;
