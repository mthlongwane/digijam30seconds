import React, { Component } from 'react'

import ons  from 'onsenui';
import {Button, Row, Col} from 'react-onsenui';


import GameCard from '../GameCard'
import cards from '../../api/cards.json'

import './index.scss';

const gameCards  = cards;

const gameState = {
    GAMESTART: 'GAMESTART',
    DICEROLL: 'DICEROLL',
    CARDPICK: 'CARDPICK',
    TIMERSTARTED: 'TIMERSTARTED',
    TIMERRESTARTED: 'TIMERRESTARTED',
    TIMEROVER:'TIMEROVER',
    CARDAUDIT:'CARDAUDIT',
    NEXTTEAM: 'NEXTTEAM',
}

export default class GamePlayScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            dice: "*",
            timer: 30,
            gameState: gameState.GAMESTART,
            disableCard: true,
            disableBtnPickup: true,
            disableBtnRollDice: false,
            disableBtnReset: true,
            cardItems: []
        }
        this.handleRollDice = this.handleRollDice.bind(this)
        this.handlePickUpCard =  this.handlePickUpCard.bind(this)
        this.handleReset = this.handleReset.bind(this)
        
    }
    handleRollDice() {
        //Randomly Generate value between zero and 2 and round to nearest int
        const randomRoll = Math.ceil(Math.random()*3-1)
        // temporarily set the dice to an asterix
        this.setState((oldstate) => {
            return { ...oldstate, 
                     dice: "*",
                     gameState: gameState.DICEROLL,
                     disableBtnRollDice: true,
                     disableBtnPickup: false
                 }
          })
        // 1 second later, set the value to the random number
        setTimeout( ()=>{this.setState((oldstate) => {
                        return { ...oldstate, 
                                dice: randomRoll
                        }
                    })} 
        ,500);

    }
    handlePickUpCard(){
        const randomCardIndex = Math.ceil(Math.random()*(gameCards.Classic.length)-1)
        const selectedCardItems = gameCards.Classic[randomCardIndex]
        this.setState((oldstate) => {
            return { ...oldstate, 
                    disableCard: false,
                    cardItems: selectedCardItems
            }
        })
       this.handleStartTimer() 
    }
    handleStartTimer() {
        
        var count = 30

        const timer  = ()=>{
            //count--;
            if(count <0){
                clearInterval(counter) //time is now up
                    ons.notification.alert("Time is up!");
                return
            }
            //Each Second that Passes Set New timer value to state
            this.setState((oldstate) => {
                return { ...oldstate, 
                        timer: count--
                }
            })
            
        }

        var counter  = setInterval(timer, 1000); //1000 will  run it every 1 second
        
        this.setState((oldstate) => {
            return { ...oldstate, 
                disableBtnPickup: true,
                disableBtnReset: false,
                counterId:counter
            }
        })

        timer()
    }
    handleReset() {

        //reset
        clearInterval(this.state.counterId)

        //reset timer, remove card, disable card, enable pickup button
        this.setState((oldstate) => {
            return { ...oldstate, 
                     gameState: gameState.TIMERRESTARTED,
                     timer: 30,
                     cardItems:[],
                     disableCard : true,
                     disableBtnPickup: false,
                     disableBtnReset: true
                 }
          })


        // pick new card
        //this.handlePickUpCard() 
    }
    render() {
        return (
            <div>
                <Row>
                    <Col className = "dice_label">Dice: {this.state.dice}</Col>
                    <Col className = "timer_label">Timer: {this.state.timer}s</Col>
                </Row>
                <Row className="flexbox-container-center">
                    <GameCard disabled = {this.state.disableCard} cardItems = {this.state.cardItems}/>
                </Row>
                <Row className = "flexbox-container-even">
                    <Col className="flexbox-item-center-noGrow">
                        <Button  onClick = {this.handleRollDice} disabled = {this.state.disableBtnRollDice}>Roll Dice</Button>
                    </Col>
                    <Col className="flexbox-item-center-noGrow">
                        <Button   onClick = {this.handlePickUpCard} disabled = {this.state.disableBtnPickup}>Pick up Card</Button>
                     </Col>
                    <Col className="flexbox-item-center-noGrow">
                        <Button   onClick = {this.handleReset} disabled = {this.state.disableBtnReset}>Reset</Button>
                    </Col>
                </Row>
                
            </div>
        )
    }
}
