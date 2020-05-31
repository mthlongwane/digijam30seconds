import React, { Component } from "react";

import ons from "onsenui";
import { Button, Row, Col } from "react-onsenui";

import GameCard from "../GameCard";

import cardItemArray from "../../localDatafiles/card-data_Main.json";
import { selectCard } from "../../helperFunctions/cardPicker";
import runTimer from "../../helperFunctions/advancedTimer";

import Swal from "sweetalert2";  

import CountComponent from "../CountComponent";
import ReactDice from '../Dice/ReactDice'

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

const printAlert = (title, text)=>{
  Swal.fire({
    position: 'top',
    allowOutsideClick: false,
    title: title,
    text: text,
    width: 275,
    padding: '0.7em',
    // Custom CSS to change the size of the modal
    customClass: {
        heightAuto: false,
        title: 'title-class',
        popup: 'popup-class',
        confirmButton: 'button-class'
    }
  })
};

export default class MultiPlayScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: "*",
      timer: "30:00",
      gameState: gameState.GAMESTART,
      disableCard: false,
      disableBtnPickup: true,
      disableBtnRollDice: false,
      disableBtnReset: true,
      cardItems: ["", "", "", "", ""],
      teams: new Array(this.props.teams ? this.props.teams : 2).fill(0),
      nocardsPickedUp: 0,
      pubnub: this.props.pubnub
    };
    this.handleRollDice = this.handleRollDice.bind(this);
    this.handlePickUpCard = this.handlePickUpCard.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.rollDoneCallback = this.rollDoneCallback.bind(this)
    this.alarm = new sound("/alarm-clock.mp3");

    this.syncmystate =this.syncmystate.bind(this);
    this.updateScore = this.updateScore.bind(this);

    this.props.pubnub.addListener({
      message: (message) => {
        //console.log(message)
        if(message.message){
          const newMessageObj = message.message;
          if( newMessageObj.newUser && newMessageObj.newUser!==this.props.user ){
            //if message object contains newUser element then a new user joined
            printAlert("Notification",`${newMessageObj.newUser} just joined! ` )
          }
          else if(newMessageObj.user && newMessageObj.user!==this.props.user ){
            //First check is to ensure that this message isnt re-broadcasted to the orignial user who published it.

            if(newMessageObj.state){
              //check if this is a state change
                if(newMessageObj.state.dice){
                  //If dice change notification should say
                  printAlert("Notification",`${newMessageObj.user} just rolled a ${newMessageObj.state.dice} on the dice` )
                }else if (newMessageObj.state.teams){
                  //If dice change notification should say
                  printAlert("Notification",`${newMessageObj.user} just updated the scores.` )
                }
              
              this.syncmystate(message.message.state)
            }
            else if(newMessageObj.additionalMessage){
              printAlert("Notification",`${newMessageObj.user} : ${newMessageObj.additionalMessage}` )
            }
          
          }
        }

      

        //printAlert("Notification",`${JSON.stringify(message)} ` )
        // // handle message
        // const channelName = message.channel;
        // const channelGroup = message.subscription;
        // const publishTimetoken = message.timetoken;
        // const msg = message.message;
        // const publisher = message.publisher;
    
        // //show time
        // const unixTimestamp = message.timetoken / 10000000;
        // const gmtDate = new Date(unixTimestamp * 1000);
        // const localeDateTime = gmtDate.toLocaleString();
      }
    });
  }
  componentDidMount(){
    // this.props.pubnub.getMessage(this.props.gameChannel, (msg) => {
    //   // Update other player's screen state
      
    //   //New user joins
    //   if (msg.message && msg.message.newUser){

    //     printAlert("Notification",`${msg.message.newUser} has joined the game!` )
    //   }else{
    //     console.log(msg.message)
    //     Swal.fire({
    //       position: 'top',
    //       allowOutsideClick: false,
    //       title: 'Message',
    //       text: `${JSON.stringify(msg.message)}`,
    //       width: 275,
    //       padding: '0.7em',
    //       // Custom CSS to change the size of the modal
    //       customClass: {
    //           heightAuto: false,
    //           title: 'title-class',
    //           popup: 'popup-class',
    //           confirmButton: 'button-class'
    //       }
    //     })
    //   }
      
      // if(this.props.user !==msg.message.user){

        //this.syncmystate( msg.message.state);
      //}
    //});
  }
  syncmystate(state){
    console.log(state)
    this.setState((oldstate)=>{
      return{
        ...oldstate,
        ...state
      }
    })
  }
  componentWillUnmount() {
    clearInterval(this.state.counterId);
    this.props.firebaseAnalytics().logEvent('Game Exit', { cardsPickedUp: this.state.nocardsPickedUp})
    
  }
  rollDoneCallback(num) {
    this.handleRollDice(num)
    this.props.pubnub.publish({
      message: {
        user: this.props.user,
        state: {dice: num}
      },
      channel: this.props.gameChannel
    });  
    //console.log(`You rolled a ${num}`)
  }
  handleRollDice(num) {
    //Randomly Generate value between zero and 2 and round to nearest int
    const randomRoll = num// Math.ceil(Math.random() * 3 - 1);
    // temporarily set the dice to an asterix
    this.setState(oldstate => {
      return {
        ...oldstate,
        dice: "*",
        gameState: gameState.DICEROLL,
        disableBtnRollDice: true,
        disableBtnPickup: false,
        disableCard: false
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
      return { ...oldstate, disableCard: false, cardItems: selectedCardItems,nocardsPickedUp: oldstate.nocardsPickedUp+1 };
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
        this.alarm.play();
        this.props.pubnub.publish({
          message: {
            user: this.props.user,
            additionalMessage: `Time is up! \n  My card contained the following items: \n ${this.state.cardItems.map((item)=>{return `\n ${item} `})}`
          },
          channel: this.props.gameChannel
        }); 
        ons.notification.alert("Time is up!").then(() => {
          this.alarm.stop();
        });

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
    this.props.pubnub.publish({
      message: {
        user: this.props.user,
        additionalMessage: `I just reset my timer!`
      },
      channel: this.props.gameChannel
    }); 
    //reset timer, remove card, disable card, enable pickup button
    this.setState(oldstate => {
      return {
        ...oldstate,
        gameState: gameState.TIMERRESTARTED,
        timer: "30:00",
        cardItems: ["", "", "", "", ""],
        disableCard: false,
        disableBtnPickup: false,
        disableBtnReset: true
      };
    });

    // pick new card
    //this.handlePickUpCard()
  }
  updateScore(index, score){
    this.setState(oldstate => {
      var newScores = [...oldstate.teams]
      newScores[index] = score

      //publish new scores
      this.props.pubnub.publish({
        message: {
          user: this.props.user,
          state: {teams: newScores}
        },
        channel: this.props.gameChannel
      }); 

      return {
        ...oldstate,
        teams: newScores
      };
    });

  }
  render() {

    return (
      <div className="gamePage">
        <Row  className="flexbox-container-center">
          <Col className="dice_label">Dice: {this.state.dice}</Col>
          
          {/*className="timer_label"*/}
          <Col  className="timer_label_center" >Timer: {this.state.timer}s</Col>
        </Row>
        
        <Row className="flexbox-container-center">
          <GameCard
            disabled={this.state.disableCard}
            cardItems={this.state.cardItems}
            categoryHead={"MIXED"}
          />
        </Row>
        

        <Row className="flexbox-container-even">
          {// <Col className="flexbox-item-center-noGrow">
          //   <Button
          //     onClick={this.handleRollDice}
          //     disabled={this.state.disableBtnRollDice}
          //   >
          //     Roll Dice
          //   </Button>
          // </Col>
          }
          <Col className="flexbox-item-center-noGrow">
            <Button
              onClick={this.handlePickUpCard}
              disabled={this.state.disableBtnPickup}
              hidden={true}
            >
              Pick up Card
            </Button>
          </Col>
          <ReactDice className=  'flexbox-item-center-noGrow'
          min = {0} 
          sides = {3}
          numDice={1}
          faceColor= {'#ffd202'}
          dotColor ={'#111111'}
          rollTime={2}
          rollDone={this.rollDoneCallback}
          ref={dice => this.reactDice = dice}
          disableIndividual={this.state.disableBtnRollDice}
          />
          <Col className="flexbox-item-center-noGrow">
            <Button
              onClick={this.handleReset}
              disabled={this.state.disableBtnReset}
            >
            Reset Timer
            </Button>
          </Col>
        </Row>
        {this.state.disableBtnRollDice?null: <span className ={'flexbox-container-center'} style ={{padding:'0px', margin:'0px'}} >Please tap the dice</span>}
        {// <Row className ='flexbox-container-center' style= {{margin: `0px`, padding: '0px'}}>
       

          
        // </Row>
        }
        
        <div className="scoresection">
          <br></br>
          <Row className="scores_label">Scores!</Row>
          <Row className="roomID_label">(Room Id: {this.props.roomId})</Row>
          <Row className=" flexbox-container-even-around ">
            {this.state.teams.map((score, index) => {
              return (
                <Col key={index} className="flexbox-item-center-noGrow">
                  Team:{index + 1}
                  <CountComponent index = {index} score ={score} updateScore = {this.updateScore}/>
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
  this.play = function() {
    this.sound.play();
  };
  this.stop = function() {
    this.sound.pause();
  };
}
