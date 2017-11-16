import Peer from "simple-peer";
import { flow } from "lodash";

function initialize(initiator, onSignal, onConnected) {
  const createdPeer = new Peer({
    initiator,
    trickle: true,
    config: {
      iceServers: [
        {
          urls: "stun:numb.viagenie.ca"
        }
      ]
    }
  });

  const bindEventToPeer = flow(
    peer => _bindConnectEvent(peer, onConnected),
    peer => _bindSignalEvent(peer, onSignal)
  );

  return bindEventToPeer(createdPeer);
}

function _bindSignalEvent(peer, onSignal) {
  peer.on("signal", onSignal);

  return peer;
}

function _bindConnectEvent(peer, onConnected) {
  const defaultConnectedHandler = () => console.log("connected");
  peer.on("connect", onConnected || defaultConnectedHandler);

  return peer;
}

function onDataReceive(peer, onData) {
  peer.on("data", onData);

  return peer;
}

function offerToHash(offer) {
  return flow(JSON.stringify, btoa)(offer);
}

function hashToOffer(hash) {
  return flow(atob, JSON.parse)(hash);
}

export { initialize, offerToHash, hashToOffer, onDataReceive };
