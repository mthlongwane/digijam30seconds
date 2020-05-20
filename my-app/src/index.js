import React from 'react';
import ReactDOM from 'react-dom';

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
//var {Page} = require('react-onsenui');


ReactDOM.render(
  // <React.StrictMode>
    //<Page>
      <App />
    //</Page>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
serviceWorker.register();