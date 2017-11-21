import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Emitter from "./containers/Emitter";
import Receiver from "./containers/Receiver";
import SocketProvider from "./components/SocketProvider";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar is-link">
            <div className="navbar-brand">
              <h1 className="title navbar-item">WebRTC-playground</h1>
            </div>
          </nav>
          <div className="section">
            <div className="container">
              <Route
                exact
                path="/"
                render={props => (
                  <SocketProvider {...props}>
                    <Emitter />
                  </SocketProvider>
                )}
              />
              <Route
                exact
                path="/r/:roomId"
                render={props => (
                  <SocketProvider {...props}>
                    <Receiver />
                  </SocketProvider>
                )}
              />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
