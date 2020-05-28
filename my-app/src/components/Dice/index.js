import React, { Component } from "react";
// import './index.scss'

import ReactDice from "./ReactDice";
import "./styles.scss";

export default class Dice extends Component {
  constructor() {
    super();
    this.state = { dice: "*" };
    this.handleRoll = this.handleRoll.bind(this);
    this.rollAll = this.rollAll.bind(this);
    this.rollDoneCallback = this.rollDoneCallback.bind(this);
  }
  handleRoll() {
    //Randomly Generate value between zero and 2 and round to nearest int
    const randomRoll = Math.ceil(Math.random() * 3 - 1);
    // temporarily set the dice to an asterix
    this.setState(oldstate => {
      return {
        ...oldstate,
        dice: "*"
      };
    });
    // 1 second later, set the value to the random number
    setTimeout(() => {
      this.setState(oldstate => {
        return { ...oldstate, dice: randomRoll };
      });
    }, 750);
  }
  rollAll(num) {
    //const valueRolled = Math.ceil(Math.random() * 3 - 1);

    this.reactDice.rollAll([num]);
  }

  rollDoneCallback(num) {}
  render() {
    return (
      <div  className="flex-col">
        <div>
          <p
            className="dice-title-center"
            style={{ textAlign: "center" }}
          >
            {" "}
            Tap the dice to roll it!
          </p>
        </div>

        <div className="dice-col-center">
          <ReactDice
            min={0}
            sides={3}
            numDice={1}
            faceColor={"#ffd202"}
            dotColor={"#111111"}
            rollTime={2}
            rollDone={this.rollDoneCallback}
            ref={dice => (this.reactDice = dice)}
            disabled={true}
          />
        </div>
      </div>
    );
  }
}
// <div onClick={this.handleRoll} className="dice">
