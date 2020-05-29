import React, { Component } from 'react'
import { Button, Row, Col, Input } from "react-onsenui";
import MultiPlayScreen from '../../components/MultiPlayScreen'

//import PubNub from 'pubnub';
//import { PubNubProvider, usePubNub } from 'pubnub-react';
import PubNubReact from 'pubnub-react';
import Swal from "sweetalert2";  
import shortid  from 'shortid';

export default class MultiPlayContainer extends Component {
    constructor(props){
        super(props)
        this.pubnub = new PubNubReact({
            publishKey: "pub-c-49802b44-59ee-46c2-a543-97b206a0b572", 
            subscribeKey: "sub-c-e23a57c4-a18e-11ea-8e2f-c62edd1c297d"    
          });
        this.state = {
            readyToPlay: false,
            disableBtnCreate: false,
            disableBtnJoin: false, 
            showCreateForm: false,
            showJoinForm: false,
            roomIdInput: "",
            usernameInput: "",
            username: null,
            roomID: null,
            isRoomCreator:false,
            lobbyChannel: null
        }
        this.handleCreateGame = this.handleCreateGame.bind(this)
        
        this.handleShowJoin = this.handleShowJoin.bind(this)
        this.handleRoomIdInput = this.handleRoomIdInput.bind(this)
        this.handleNameInput = this.handleNameInput.bind(this)
        this.handleJoinGame = this.handleJoinGame.bind(this)

        this.lobbyChannel = null; // Lobby channel
        this.gameChannel = null; // Game channel
        this.roomId = null; // Unique id when player creates a room   
        
        this.pubnub.init(this); // Initialize PubNub
    }
    componentDidUpdate() {
        // Check that the player is connected to a channel
        if(this.lobbyChannel != null){
          this.pubnub.getMessage(this.lobbyChannel, (msg) => {
            // Start the game once an opponent joins the channel
            if(msg.message.notRoomCreator){
              // Create a different channel for the game
              this.gameChannel = '30SecondsOnlinelobby--' + this.roomId;
              this.pubnub.subscribe({
                channels: [this.gameChannel]
              });
              this.setState(oldstate =>{ return {...oldstate ,readyToPlay: true} })
            }
            this.setState(oldstate =>{ return {...oldstate ,readyToPlay: true} })
          }); 
        }
      }
    handleCreateGame(){
        this.roomId = shortid.generate().substring(0,5);
        this.lobbyChannel = '30SecondsOnlinelobby--' + this.roomId; // Lobby channel name
        this.pubnub.subscribe({
            channels: [this.lobbyChannel],
            withPresence: true // Checks the number of people in the channel
        });
        Swal.fire({
            position: 'top',
            allowOutsideClick: false,
            title: 'Share this room ID with your friend',
            text: this.roomId,
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
        this.setState(oldstate =>{ return {...oldstate, roomId: this.roomId ,disableBtnCreate:true, showCreateForm: false, showJoinForm: false, isRoomCreator: true,lobbyChannel: this.lobbyChannel, readyToPlay: true} })
    }
    handleShowJoin(){
        this.setState(oldstate =>{ return {...oldstate ,showJoinForm: true, showCreateForm: false} })
    }
    handleJoinGame(){
        this.roomId = this.state.roomIdInput;
        this.lobbyChannel = '30SecondsOnlinelobby--' + this.roomId;

        // Check the number of people in the channel
        this.pubnub.hereNow({
            channels: [this.lobbyChannel], 
        }).then((response) => { 
            if(response.totalOccupancy < 10){
                this.pubnub.subscribe({
                channels: [this.lobbyChannel],
                withPresence: true
                });
                
                this.setState({
                username: this.state.usernameInput, // Player name
                });  
                
                this.pubnub.publish({
                message: {
                    notRoomCreator: true,
                },
                channel: this.lobbyChannel
                });
                this.setState(oldstate =>{ return {...oldstate ,showJoinForm: false, showCreateForm: false, lobbyChannel: this.lobbyChannel, username: oldstate.usernameInput} })
            } 
            else{
                // Game in progress
                Swal.fire({
                  position: 'top',
                  allowOutsideClick: false,
                  title: 'Error',
                  text: 'Game in progress. Try another room.',
                  width: 275,
                  padding: '0.7em',
                  customClass: {
                      heightAuto: false,
                      title: 'title-class',
                      popup: 'popup-class',
                      confirmButton: 'button-class'
                  }
                })
              }
              
        }).catch((error) => { 
            console.log(error);
        });

    }
    handleRoomIdInput(e){
        this.setState(oldstate =>{ return {...oldstate ,roomIdInput:e.target.value} })
    }
    handleNameInput(e){
        this.setState(oldstate =>{ return {...oldstate ,usernameInput:e.target.value} })
    }

    render() {
        return (
            <div>{
                !this.state.readyToPlay? (
                    <div> 
                        <Row className="flexbox-container-even">
                            <Col className="flexbox-item-center-noGrow">
                            <Button
                                onClick={this.handleCreateGame}
                                disabled={this.state.disableBtnCreate}
                            >
                                Create Game
                            </Button>
                            </Col>

                            <Col className="flexbox-item-center-noGrow">
                            <Button
                                onClick={this.handleShowJoin}
                                disabled={this.state.disableBtnJoin}
                            >
                            Join Game
                            </Button>
                            </Col>
                        </Row>
                        {this.state.showJoinForm?(
                            <div className="flexbox-container-center">
                            <div className="flexbox-container-col-center">
                                <p>
                                <Input
                                value={this.state.roomIdInput}
                                onChange={this.handleRoomIdInput}
                                modifier='underbar'
                                float
                                placeholder='Room ID' />
                                </p>
                                <p>
                                <Input
                                value={this.state.usernameInput}
                                onChange={this.handleNameInput}
                                modifier='underbar'
                                type='text'
                                float
                                placeholder='Your Name' />
                                </p>
                                
                                <p style= {{textAlign:'center'}}>
                                <Button onClick={this.handleJoinGame}>Join Game</Button>
                                </p>
                            </div>
                            </div>
                        )
                        :
                        (null)
                        }
                    </div>
                )
                : (
                    <MultiPlayScreen teams={this.props.teams} 
                    pubnub={this.pubnub}
                    gameChannel={this.gameChannel} 
                    isRoomCreator={this.state.isRoomCreator}
                    endGame={this.endGame}
                    />
                )
            }
            
            </div>
        )
    }
}
