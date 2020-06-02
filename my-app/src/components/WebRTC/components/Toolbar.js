import React, { Component } from 'react';
import './Toolbar.scss';

class Toolbar extends Component {

  get computedStyles() {
    let toolbarButton      = this.props.buttonsAvailable ? "toolbar-webrtcButton" : "toolbar-webrtcButton unavailable";
    let sectionButtonLeft  = toolbarButton + " sectionButton left";
    let sectionButtonRight = toolbarButton + " sectionButton right";
    let callButton         = toolbarButton + " callButton";
    let shareButtonImage   = "shareButtonImg";
    return {
        cameraButtonStyle:       this.props.cameraButtonState       ? sectionButtonLeft  + " cameraOn"             : sectionButtonLeft  + " hoverRed cameraOff",
        microphoneButtonStyle:   this.props.microphoneButtonState   ? sectionButtonRight + " microphoneOn"         : sectionButtonRight + " hoverRed microphoneOff",
        joinLeaveButtonStyle:    this.props.joinLeaveButtonState    ? callButton         + " hoverGreen callStart" : callButton         + " hoverRed callEnd",
        screenShareButtonStyle:  this.props.screenShareButtonState  ? toolbarButton      + " shareButton"          : toolbarButton      + " shareButton hoverRed",
        shareButtonImageStyle:   this.props.screenShareButtonState  ? shareButtonImage   + " startShare"           : shareButtonImage   + " stopShare"
    }
  }
  
  get joinLeaveButtonTittle() {
    return this.props.joinLeaveButtonState ? "Join Conference" : "Leave Conference";
  }

  get screenShareButtonTittle() {
    return this.props.screenShareButtonState ? "Start Sharing" : "Stop Sharing";
  }

  cameraButtonOnClick() {
    this.props.cameraButtonOnClick(!this.props.cameraButtonState);
  }

  joinLeaveButtonOnClick() {
    this.props.joinLeaveButtonOnClick(!this.props.joinLeaveButtonState);
  }
  
  microphoneButtonOnClick() {
    this.props.microphoneButtonOnClick(!this.props.microphoneButtonState);
  }

  screenShareButtonOnClick() {
    this.props.screenShareButtonOnClick(!this.props.screenShareButtonState);
  }

  render() {
    return (
      <div className="toolbar-webrtc">
          <div id='toolbar-webrtcLeft' className="toolbar-webrtcLeft">
              <span id="participantStatus" className="participantStatus">{ this.props.participantStatus }</span>
          </div>
          <div id='toolbar-webrtcCenter' className="toolbar-webrtcCenter">
              <button 
                      id='cameraButton'
                      title="Camera Privacy"
                      className={ this.computedStyles.cameraButtonStyle }
                      onClick={ () => this.cameraButtonOnClick() }>
              </button>
              <button 
                      id='microphoneButton'
                      title="Microphone Privacy"
                      className={ this.computedStyles.microphoneButtonStyle }
                      onClick={ () => this.microphoneButtonOnClick() }>
              </button>
              <button 
                      id='joinLeaveButton'
                      title={ this.joinLeaveButtonTittle }
                      className={ this.computedStyles.joinLeaveButtonStyle }
                      onClick={ () => this.joinLeaveButtonOnClick() }>
              </button>
              <button 
                      id='screenShareButton'
                      title={ this.screenShareButtonTittle }
                      className={ this.computedStyles.screenShareButtonStyle }
                      onClick={ () => this.screenShareButtonOnClick() }>
                  <div className={ this.computedStyles.shareButtonImageStyle }></div>
              </button>
          </div>
          <div id='toolbar-webrtcRight' className="toolbar-webrtcRight">
              <span id='connectionStatus' className="connectionStatus">{ this.props.connectionStatus }</span>
              <span id='clientVersion' className="clientVersion">{ this.props.clientVersion }</span>
          </div>
      </div>
    );
  }
}

export default Toolbar;
