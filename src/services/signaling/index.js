import io from "socket.io-client";
import { flow } from "lodash";

const SIGNALING_SERVER_IP = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
let socket = null;

function connectToSocket(namespace = "") {
  if (!socket) {
    socket = io(`${SIGNALING_SERVER_IP}/${namespace}`);
  }

  return socket;
}

function bindToSocket(socket, { onReady, onArrival, onReceived }) {
  const bindEventToSocket = flow(
    socket => _bindOnReceiverArrivalEvent(socket, onArrival),
    socket => _bindSignalFromSocketReceivedEvent(socket, onReceived),
    () => onReady()
  );

  socket.on("connect", () => {
    bindEventToSocket(socket);
  });

  return socket;
}

function _bindOnReceiverArrivalEvent(socket, onArrival) {
  socket.on("receiver-arrival", onArrival);

  return socket;
}

function _bindSignalFromSocketReceivedEvent(socket, onReceived) {
  socket.on("handshake", onReceived);

  return socket;
}

function joinRoom(socket, roomId) {
  socket.emit("join", roomId);

  return socket;
}

function broadcastOfferToSocket(socket, signal, roomId) {
  socket.emit("handshake", signal, roomId);

  return socket;
}

export { connectToSocket, bindToSocket, joinRoom, broadcastOfferToSocket };
