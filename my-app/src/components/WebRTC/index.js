import React from 'react';
// import ReactDOM from 'react-dom';
import './index.scss';
import VidyoConnector from './VidyoConnector';
//import {generateToken} from './utils/generateToken'

import  jsSHA  from 'jssha';
import  btoa from 'btoa';


export default class WebRTC extends React.Component{  
    constructor(props){
        super(props)
        const gentoken = generateToken("108aa013b88948c88b78caea74d44b5c", "320995.vidyo.io", this.props.user,99999 )
        const useNativeWebRTC = getUrlParameterByName("useNativeWebRTC", true)
        this.state = {
            gentoken :gentoken,
            host :getUrlParameterByName("host", "prod.vidyo.io"),
            token : getUrlParameterByName("token",`${gentoken}`),
            resourceId : getUrlParameterByName("resourceId", `${this.props.roomId}`),
            displayName : getUrlParameterByName("displayName", `${this.props.user}`),
            useNativeWebRTC : useNativeWebRTC ,
            webRtcScriptId :  loadRemoteVidyoClientLib(useNativeWebRTC, false),
            viewId : "renderer",
            viewStyle : "VIDYO_CONNECTORVIEWSTYLE_Default",
            remoteParticipants :10,
            logFileFilter : "warning all@VidyoConnector info@VidyoClient",
            logFileName : "",
            userData : "",
        }
    }
    // componentWillUnmount(){
    //     var element = document.getElementById(this.state.webRtcScriptId);
    //     element.parentNode.removeChild(element);
    // }
    render(){
        // const gentoken = generateToken("108aa013b88948c88b78caea74d44b5c", "320995.vidyo.io", this.props.user,99999 )
        // const host              = getUrlParameterByName("host", "prod.vidyo.io");
        // const token             = getUrlParameterByName("token",`${gentoken}`);
        // const resourceId        = getUrlParameterByName("resourceId", `${this.props.roomId}`);
        // const displayName       = getUrlParameterByName("displayName", `${this.props.user}`);
        // const useNativeWebRTC   = getUrlParameterByName("useNativeWebRTC", true);
        
        // const webRtcScriptId =  loadRemoteVidyoClientLib(useNativeWebRTC, false);
        
        // this.set

        // const viewId                = "renderer";
        // const viewStyle             = "VIDYO_CONNECTORVIEWSTYLE_Default";
        // const remoteParticipants    = 10;
        // const logFileFilter         = "warning all@VidyoConnector info@VidyoClient";
        // const logFileName           = "";
        // const userData              = "";
        return ( <VidyoConnector 
                    host        = { this.state.host }
                    token       = { this.state.token }
                    resourceId  = { this.state.resourceId }
                    displayName = { this.state.displayName }
                    viewId             = { this.state.viewId }
                    viewStyle          = { this.state.viewStyle }
                    remoteParticipants = { this.state.remoteParticipants }
                    logFileFilter      = { this.state.logFileFilter }
                    logFileName        = { this.state.logFileName }
                    userData           = { this.state.userData }
    />) 
    }         
}

function loadRemoteVidyoClientLib(useNativeWebRTC = false, plugin = false) {
    let script  = document.createElement('script');
    const randomVal =  `${Math.random()}`
    script.setAttribute("id",randomVal );
    script.type = 'text/javascript';
    script.src  = `https://static.vidyo.io/latest/javascript/VidyoClient/VidyoClient.js?onload=onVidyoClientLoaded&useNativeWebRTC=${useNativeWebRTC}&plugin=${plugin}&webrtcLogLevel=info`;
    document.getElementsByTagName('head')[0].appendChild(script);
    return randomVal
}

function getUrlParameterByName(name, _default = '') {
    let match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return (match && decodeURIComponent(match[1].replace(/\+/g, ' '))) || _default;
}






function getRandomInt() {
return Math.floor(Math.random() * Math.floor(9999));
}

function generateToken(developerKey,applicationId,username,expiresInSeconds) {
    var EPOCH_SECONDS = 62167219200;
    var expires = Math.floor(Date.now() / 1000) + expiresInSeconds + EPOCH_SECONDS;
    var shaObj = new jsSHA("SHA-384", "TEXT");
    shaObj.setHMACKey(developerKey, "TEXT");
    var jid = `${username}` + getRandomInt() + '@' + applicationId;
    // eslint-disable-next-line
    var body = 'provision' + '\x00' + jid + '\x00' + expires + '\x00';
    shaObj.update(body);
    var mac = shaObj.getHMAC("HEX");
    var serialized = body + '\0' + mac;
    return btoa(serialized);
}