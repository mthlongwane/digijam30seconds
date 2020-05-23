import React, { Component } from "react";

import ons from "onsenui";
import { Button, Row, Col } from "react-onsenui";

import GameCard from "../GameCard";

import cardItemArray from "../../localDatafiles/card-data_Main.json";
import selectCard from "../../helperFunctions/cardPicker";
import runTimer from "../../helperFunctions/advancedTimer";

import CountComponent from "../CountComponent";

import "./index.scss";

const gameCards = cardItemArray;

const gameState = {
  GAMESTART: "GAMESTART",
  DICEROLL: "DICEROLL",
  CARDPICK: "CARDPICK",
  TIMERSTARTED: "TIMERSTARTED",
  TIMERRESTARTED: "TIMERRESTARTED",
  TIMEROVER: "TIMEROVER",
  CARDAUDIT: "CARDAUDIT",
  NEXTTEAM: "NEXTTEAM"
};

export default class GamePlayScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: "*",
      timer: "30:00",
      gameState: gameState.GAMESTART,
      disableCard: true,
      disableBtnPickup: true,
      disableBtnRollDice: false,
      disableBtnReset: true,
      cardItems: [],
      teams: new Array(this.props.teams ? this.props.teams : 2).fill("")
    };
    this.handleRollDice = this.handleRollDice.bind(this);
    this.handlePickUpCard = this.handlePickUpCard.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.alarm = new sound("/alarm-clock.mp3");
  }
  handleRollDice() {
    //Randomly Generate value between zero and 2 and round to nearest int
    const randomRoll = Math.ceil(Math.random() * 3 - 1);
    // temporarily set the dice to an asterix
    this.setState(oldstate => {
      return {
        ...oldstate,
        dice: "*",
        gameState: gameState.DICEROLL,
        disableBtnRollDice: true,
        disableBtnPickup: false,
        disableCard: true
      };
    });
    // 1 second later, set the value to the random number
    setTimeout(() => {
      this.setState(oldstate => {
        return { ...oldstate, dice: randomRoll };
      });
    }, 500);
  }
  handlePickUpCard() {
    // const randomCardIndex = Math.ceil(
    //   Math.random() * gameCards.Classic.length - 1
    // );
    const selectedCardItems = selectCard(gameCards); //gameCards.Classic[randomCardIndex];
    this.setState(oldstate => {
      return { ...oldstate, disableCard: false, cardItems: selectedCardItems };
    });
    this.handleStartTimer();
  }
  handleStartTimer() {
    var countSeconds = 30;
    var countSplits = 0;
    var count = 3000;
    const timer = () => {
      if (count < 0) {
        clearInterval(counter); //time is now up
        this.alarm.play()
        ons.notification.alert("Time is up!").then(()=>{this.alarm.stop()});
        this.setState(oldstate => {
          return {
            ...oldstate,
            disableBtnRollDice: false,
            disableBtnReset: true
          };
        });
        return;
      }
      if (countSplits < 0) {
        countSeconds--;
        countSplits = 99;
      }
      var newTime = runTimer(countSplits, countSeconds);
      //Each Second that Passes Set New timer value to state
      this.setState(oldstate => {
        return { ...oldstate, timer: newTime };
      });
      count--;
      countSplits--;
    };

    var counter = setInterval(timer, 10); //1000 will  run it every 1 second

    this.setState(oldstate => {
      return {
        ...oldstate,
        disableBtnPickup: true,
        disableBtnReset: false,
        counterId: counter
      };
    });

    timer();
  }
  handleReset() {
    //reset
    clearInterval(this.state.counterId);

    //reset timer, remove card, disable card, enable pickup button
    this.setState(oldstate => {
      return {
        ...oldstate,
        gameState: gameState.TIMERRESTARTED,
        timer: "30:00",
        cardItems: [],
        disableCard: true,
        disableBtnPickup: false,
        disableBtnReset: true
      };
    });

    // pick new card
    //this.handlePickUpCard()
  }
  render() {
    return (
      <div >

        <Row>
          <Col className="dice_label">Dice: {this.state.dice}</Col>
          <Col className="timer_label">Timer: {this.state.timer}s</Col>
        </Row>
        <br></br>
        <Row className="flexbox-container-center">
          <GameCard
            disabled={this.state.disableCard}
            cardItems={this.state.cardItems}
          />
        </Row>
        <br></br>
        
        <Row className="flexbox-container-even">
          <Col className="flexbox-item-center-noGrow">
            <Button
              onClick={this.handleRollDice}
              disabled={this.state.disableBtnRollDice}
            >
              Roll Dice
            </Button>
          </Col>
          <Col className="flexbox-item-center-noGrow">
            <Button
              onClick={this.handlePickUpCard}
              disabled={this.state.disableBtnPickup}
            >
              Pick up Card
            </Button>
          </Col>
          <Col className="flexbox-item-center-noGrow">
            <Button
              onClick={this.handleReset}
              disabled={this.state.disableBtnReset}
            >
              Reset
            </Button>
          </Col>
        </Row>
        <div className="scoresection" >
            <br></br>
            <Row className="scores_label">Scores!</Row>
            <br></br>
            <Row className=" flexbox-container-even-around ">
            {this.state.teams.map((item, index) => {
                return (
                <Col key={index} className="flexbox-item-center-noGrow">
                    Team:{index + 1}
                    <CountComponent />
                </Col>
                );
            })}
            </Row>
        </div>
      </div>
    );
  }
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }
