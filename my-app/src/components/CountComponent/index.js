import React, { Component } from "react";
import "./index.scss";

export default class CountComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: this.props.score||0
    };
    this.plusLabelTouch = this.plusLabelTouch.bind(this);
    this.minusLabelTouch = this.minusLabelTouch.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    // Any time props.email changes, update state.
    if (nextProps.score !== this.props.score) {
      this.setState({
        score: nextProps.score
      });
    }
  }

  minusLabelTouch() {
    if (this.state.score > 0) {

      this.setState(oldstate => {
        if(this.props.updateScore){
          this.props.updateScore(this.props.index, oldstate.score - 1)
        }
        return {
          ...oldstate,
          score: oldstate.score - 1
        };
      });
    }
  }

  plusLabelTouch() {

   
    this.setState(oldstate => {
      if(this.props.updateScore){
        this.props.updateScore(this.props.index, oldstate.score + 1)
      }
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
          {this.props.score||this.state.score}
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
