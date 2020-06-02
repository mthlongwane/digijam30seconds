import React, { Component } from "react";

import "./index.scss";

export default class CountComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: this.props.score
    };
    this.plusLabelTouch = this.plusLabelTouch.bind(this);
    this.minusLabelTouch = this.minusLabelTouch.bind(this);
  }

  minusLabelTouch() {
    if (this.state.score > 0) {
      if(this.props.updateScore){
      this.props.updateScore(this.props.index, this.state.score-1)
      }
      this.setState(oldstate => {
        return {
          ...oldstate,
          score: oldstate.score - 1
        };
      });
    }
  }

  plusLabelTouch() {
    if(this.props.updateScore){
      this.props.updateScore(this.props.index, this.state.score+1)
    }
   
    this.setState(oldstate => {
      return {
        ...oldstate,
        score: oldstate.score + 1
      };
    });
  }

  render() {
    return (
      <div className="flexbox-container-even-around">
        <button
          className="button-counter flexbox-item-center-noGrow"
          onClick={this.minusLabelTouch}
        >
          -1
        </button>
        <label className="label-counter flexbox-item-center-noGrow">
          {this.state.score}
        </label>
        <button
          className="button-counter flexbox-item-center-noGrow"
          onClick={this.plusLabelTouch}
        >
          +1
        </button>
      </div>
    );
  }
}
