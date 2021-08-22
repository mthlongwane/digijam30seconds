import React, { Component } from "react";
import { Button, Row, Input } from "react-onsenui";
import MultiPlayScreen from "../../components/MultiPlayScreen";

//import PubNub from 'pubnub';
//import { PubNubProvider, usePubNub } from 'pubnub-react';
import PubNubReact from "pubnub-react";
import Swal from "sweetalert2";
import shortid from "shortid";

const printAlert = (title, text) => {
  Swal.fire({
    position: "top",
    allowOutsideClick: false,
    title: title,
    text: text,
    width: 275,
    padding: "0.7em",
    // Custom CSS to change the size of the modal
    customClass: {
      heightAuto: false,
      title: "title-class",
      popup: "popup-class",
      confirmButton: "button-class"
    }
  });
};

export default class MultiPlayContainer extends Component {
  constructor(props) {
    super(props);
    this.pubnub = new PubNubReact({
      publishKey: "pub-c-49802b44-59ee-46c2-a543-97b206a0b572",
      subscribeKey: "sub-c-e23a57c4-a18e-11ea-8e2f-c62edd1c297d"
    });
    this.state = {
      readyToPlay: false,
      disableBtnCreate: this.props.disableBtnCreate || false,
      disableBtnJoin: this.props.disableBtnJoin || false,
      showCreateForm: false,
      showJoinForm: this.props.showJoinForm || false,
      roomIdInput: this.props.roomIdInput || "",
      usernameInput: "",
      username: null,
      roomID: null,
      isRoomCreator: false,
      lobbyChannel: this.lobbyChannel,
      participants: ["admin"]
    };
    this.handleCreateGame = this.handleCreateGame.bind(this);

    this.handleShowJoin = this.handleShowJoin.bind(this);
    this.handleRoomIdInput = this.handleRoomIdInput.bind(this);
    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleJoinGame = this.handleJoinGame.bind(this);

    this.lobbyChannel = null; // Lobby channel
    this.gameChannel = null; // Game channel
    this.roomId = null; // Unique id when player creates a room

    this.pubnub.init(this); // Initialize PubNub
  }
  componentDidUpdate() {
    // Check that the player is connected to a channel
    if (this.lobbyChannel != null) {
      this.pubnub.getMessage(this.lobbyChannel, msg => {
        // Start the game once an opponent joins the channel

        if (msg.message.notRoomCreator) {
          // Subscribe to channel for the game
          this.gameChannel = "30SecondsOnlinelobby--" + this.roomId;
          this.pubnub.subscribe({
            channels: [this.gameChannel]
          });

          this.setState({ readyToPlay: true });
        } else if (msg.message.notRoomCreator === false) {
          printAlert(
            "Notification",
            "No room with that ID was found! - We have created a new room for you (:"
          );
          this.setState({ isRoomCreator: true, readyToPlay: true });
        }
      });
    }
  }
  //   componentWillMount() {
  //     // Check that the player is connected to a channel
  //     if(this.lobbyChannel != null){
  //       this.pubnub.getMessage(this.lobbyChannel, (msg) => {
  //         // Start the game once an opponent joins the channel
  //         if(msg.message.notRoomCreator){
  //           // Create a different channel for the game
  //           this.gameChannel = '30SecondsOnlinelobby--' + this.roomId;
  //           this.pubnub.subscribe({
  //             channels: [this.gameChannel]
  //           });
  //           this.setState({readyToPlay: true})
  //           //this.setState(oldstate =>{ return {...oldstate ,readyToPlay: true} })
  //         }
  //         //this.setState({readyToPlay: true} )
  //         //this.setState(oldstate =>{ return {...oldstate ,readyToPlay: true} })
  //       });
  //       //this.pubnub.getStatus();
  //     }
  //   }

  componentWillUnmount() {
    this.pubnub.unsubscribe({
      channels: [this.lobbyChannel, this.gameChannel]
    });
    this.setState({ readyToPlay: false });
  }
  handleCreateGame() {
    this.roomId = shortid.generate().substring(0, 5);
    this.lobbyChannel = "30SecondsOnlinelobby--" + this.roomId; // Lobby channel name
    this.pubnub.subscribe({
      channels: [this.lobbyChannel],
      withPresence: true // Checks the number of people in the channel
    });
    //console.log(`${window.location.href}join/:${this.props.teams}/:${this.roomId}/:${this.props.level}`)
    if (navigator.share) {
      navigator
        .share({
          text: `Please join my 30 Seconds online game.`,
          url: `${window.location.href}join/:${this.props.teams}/:${this.roomId}/:${this.props.level}`
        })
        .then(() => {
          console.log("Successful share");
          this.props.firebaseAnalytics().logEvent("Game code shared");
        })
        .catch(error => console.log("Error sharing", error));
    }
    Swal.fire({
      position: "top",
      allowOutsideClick: false,
      title: "Share this link for people to join the game",
      text: `A popup will appear shortly which will allow you to share the link. You can also share this by clicking the Room Id at the bottom of the screen.  `,
      width: 275,
      padding: "0.7em",
      customClass: {
        heightAuto: false,
        title: "title-class",
        popup: "popup-class",
        confirmButton: "button-class"
      }
    });

    this.setState({
      roomId: this.roomId,
      disableBtnCreate: true,
      showCreateForm: false,
      showJoinForm: false,
      isRoomCreator: true,
      lobbyChannel: this.lobbyChannel,
      readyToPlay: true,
      username: "admin"
    });
    // this.setState(oldstate =>{ return {...oldstate, roomId: this.roomId ,disableBtnCreate:true, showCreateForm: false, showJoinForm: false, isRoomCreator: true,lobbyChannel: this.lobbyChannel, readyToPlay: true , username: "admin"} })
  }
  //   componentWillMount() {
  //     // Check that the player is connected to a channel
  //     if(this.lobbyChannel != null){
  //       this.pubnub.getMessage(this.lobbyChannel, (msg) => {
  //         // Start the game once an opponent joins the channel
  //         if(msg.message.notRoomCreator){
  //           // Create a different channel for the game
  //           this.gameChannel = '30SecondsOnlinelobby--' + this.roomId;
  //           this.pubnub.subscribe({
  //             channels: [this.gameChannel]
  //           });
  //           this.setState({readyToPlay: true})
  //           //this.setState(oldstate =>{ return {...oldstate ,readyToPlay: true} })
  //         }
  //         //this.setState({readyToPlay: true} )
  //         //this.setState(oldstate =>{ return {...oldstate ,readyToPlay: true} })
  //       });
  //       //this.pubnub.getStatus();
  //     }
  //   }
  handleShowJoin() {
    this.setState({ showJoinForm: true, showCreateForm: false });
    //this.setState(oldstate =>{ return {...oldstate ,showJoinForm: true, showCreateForm: false} })
  }
  handleJoinGame() {
    this.roomId = this.state.roomIdInput;
    this.lobbyChannel = "30SecondsOnlinelobby--" + this.roomId;

    // Check the number of people in the channel
    this.pubnub
      .hereNow({
        channels: [this.lobbyChannel]
      })
      .then(response => {
        if (response.totalOccupancy < 100) {
          this.pubnub.subscribe({
            channels: [this.lobbyChannel],
            withPresence: true
          });

          this.setState({
            username: this.state.usernameInput // Player name
          });

          this.pubnub.publish({
            message: {
              notRoomCreator: response.totalOccupancy > 0, //determines occupancy determines if I am the room creator
              newUser: this.state.usernameInput
            },
            channel: this.lobbyChannel
          });
          //participants array !!
          this.state.participants.push(this.state.usernameInput);

          this.setState({
            roomId: this.roomId,
            showJoinForm: false,
            showCreateForm: false,
            lobbyChannel: this.lobbyChannel,
            username: this.state.usernameInput
          });
          // this.setState(oldstate =>{ return {...oldstate, roomId: this.roomId,showJoinForm: false, showCreateForm: false, lobbyChannel: this.lobbyChannel, username: oldstate.usernameInput} })
        } else {
          // Game in progress
          Swal.fire({
            position: "top",
            allowOutsideClick: false,
            title: "Error",
            text: "Game in progress. Try another room.",
            width: 275,
            padding: "0.7em",
            customClass: {
              heightAuto: false,
              title: "title-class",
              popup: "popup-class",
              confirmButton: "button-class"
            }
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  handleRoomIdInput(e) {
    this.setState(oldstate => {
      return { ...oldstate, roomIdInput: e.target.value };
    });
  }
  handleNameInput(e) {
    this.setState(oldstate => {
      return { ...oldstate, usernameInput: e.target.value };
    });
  }
  // Reset everything
  endGame = () => {
    this.setState({
      piece: "",
      isPlaying: false,
      isRoomCreator: false,
      isDisabled: false,
      myTurn: false
    });

    this.lobbyChannel = null;
    this.gameChannel = null;
    this.roomId = null;

    this.pubnub.unsubscribe({
      channels: [this.lobbyChannel, this.gameChannel]
    });
  };
  render() {
    return (
      <div className="gamePage">
        {!this.state.readyToPlay ? (
          <div>
            <div className="flexbox-container-center-img">
              <section style={{ margin: "16px", marginTop: "0px" }}>
                <br></br>
                {this.state.disableBtnCreate ? null : (
                  <Row
                    onClick={this.handleCreateGame}
                    className="sections flexbox-container-center-1 "
                    style={{ backgroundColor: "#ffd202" }}
                  >
                    <Row className="flexbox-container-center-1">
                      <h1 style={{ padding: "0px" }}>Create Room</h1>
                    </Row>
                    <Row className="flexbox-container-center-1 sections-text">
                      <p>Call your friends and let the games begin </p>
                    </Row>
                  </Row>
                )}
                <br></br>
                {this.state.disableBtnJoin ? null : (
                  <Row
                    onClick={this.handleShowJoin}
                    className="sections flexbox-container-center-2"
                    style={{ backgroundColor: "#ffe795" }}
                  >
                    <Row className="flexbox-container-center-2">
                      <h1 style={{ padding: "0px" }}>Join Room</h1>
                    </Row>
                    <Row className="flexbox-container-center-2 sections-text">
                      <p>Been invited to a game and have a game-room code?</p>
                    </Row>
                  </Row>
                )}
              </section>
            </div>
            {this.state.showJoinForm ? (
              <div className="flexbox-container-center-img">
                <div className="flexbox-container-col-center">
                  <p style={{ color: "#ffff" }}>
                    <Input
                      value={this.state.roomIdInput}
                      onChange={this.handleRoomIdInput}
                      modifier="underbar"
                      float
                      placeholder="Room ID"
                    />
                  </p>
                  <p style={{ color: "#ffff" }}>
                    <Input
                      value={this.state.usernameInput}
                      onChange={this.handleNameInput}
                      modifier="underbar"
                      type="text"
                      float
                      placeholder="Your Name"
                    />
                  </p>

                  <p style={{ textAlign: "center" }}>
                    <Button onClick={this.handleJoinGame}>Join Game</Button>
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <MultiPlayScreen
            user={this.state.username}
            roomId={this.roomId}
            teams={this.props.teams}
            pubnub={this.pubnub}
            gameChannel={this.state.lobbyChannel}
            isRoomCreator={this.state.isRoomCreator}
            endGame={this.endGame}
            pn_messages={this.state.pn_messages}
            firebaseAnalytics={this.props.firebaseAnalytics}
            readyToPlay={this.state.readyToPlay}
            fullCategories={this.props.fullCategories}
            level={this.props.level}
            disableVideo={this.props.disableVideo}
            participants={this.state.participants}
          />
        )}
      </div>
    );
  }
}
