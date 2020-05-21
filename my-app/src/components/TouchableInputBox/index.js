import React, { Component } from "react";

import "./index.scss";

export default class TouchableInputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      isLabel: true
    };
    this.handleisLabelTouch = this.handleisLabelTouch.bind(this);
  }

  handleisLabelTouch() {
    this.setState(oldstate => {
      return {
        ...oldstate,
        isLabel: false
      };
    });
  }
  render() {
    return (
      <div>
        {this.state.isLabel ? (
          <label onClick={this.handleisLabelTouch}>{this.state.score}</label>
        ) : (
          <input className="inputbox-score"></input>
        )}
      </div>
    );
  }
}
