import React from 'react';
import ReactDOM from 'react-dom';

import firebase from 'firebase'

import './index.scss';
import App from './containers/App';

import * as serviceWorker from './serviceWorker';

// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

//used for my build versioning
import packageJson from '../package.json';
global.appVersion = packageJson.version;

//var ons = require('onsenui');
//var Ons = require('react-onsenui');
//var {Page, PullHook} = require('react-onsenui');

const firebaseConfig = {
  apiKey: "AIzaSyDxfu1GbUaSgzO-F_K9x_NhmZPclM4rSrI",
  authDomain: "secondsonline-63f60.firebaseapp.com",
  databaseURL: "https://secondsonline-63f60.firebaseio.com",
  projectId: "secondsonline-63f60",
  storageBucket: "secondsonline-63f60.appspot.com",
  messagingSenderId: "134149901655",
  appId: "1:134149901655:web:10550c1a4a06e363f38212",
  measurementId: "G-1ZR02C1MXZ"
};
firebase.initializeApp(firebaseConfig);
const firebaseAnalytics = firebase.analytics;
firebaseAnalytics().logEvent('webpage_loaded');

ReactDOM.render(
  // <React.StrictMode>
    // <Page>
    // <PullHook onChange{handleRefreshPull} onPull ={refreshCacheAndReload}>
    // </PullHook>
      <App firebaseAnalytics ={firebaseAnalytics}/>
  //  </Page>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
serviceWorker.register();

