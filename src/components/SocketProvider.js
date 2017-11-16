import { Component, Children, cloneElement } from "react";
import { connectToSocket } from "../services/signaling";

class SocketProvider extends Component {
  constructor(props) {
    super(props);

    this.socket = connectToSocket();
  }

  render() {
    const child = Children.only(this.props.children);

    const propsWithSocket = {
      ...this.props,
      socket: this.socket
    };

    return cloneElement(child, propsWithSocket, child.props.children);
  }
}

export default SocketProvider;
