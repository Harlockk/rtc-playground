import React, { Component } from "react";
import copy from "copy-to-clipboard";

class CopyClipboard extends Component {
  onClick = () => {
    copy(this.props.value);
  };

  render() {
    return (
      <div className="field has-addons">
        <p className="control">
          <input className="input is-left" readOnly value={this.props.value} />
        </p>
        <p className="control">
          <button className="button is-link is-left" onClick={this.onClick}>
            Copy
          </button>
        </p>
      </div>
    );
  }
}

export default CopyClipboard;
