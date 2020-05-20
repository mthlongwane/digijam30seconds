import React, { Component } from 'react'

import ons  from 'onsenui';
import {Button} from 'react-onsenui';

export default class Login extends Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        ons.notification.alert('Hello world!');
    }
    render() {
        return (
            <div>
                <Button onClick = {this.handleClick}>Btn</Button>
            </div>
        )
    }
}
