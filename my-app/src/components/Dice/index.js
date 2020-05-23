import React, { Component } from 'react'
import './index.scss'
export default class Dice extends Component {
    constructor(){
        super()
        this.state = {dice: '*'}
        this.handleRoll =  this.handleRoll.bind(this)
    }
    handleRoll(){
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
    render() {
        return (
            <div>
                <div onClick={this.handleRoll} className="dice">
                    {this.state.dice}
                </div>
               <p style= {{textAlign:'center'}}> Tap on the yellow spot to roll the dice</p>
            </div>
        )
    }
}
//