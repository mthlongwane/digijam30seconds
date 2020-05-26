import React, { Component } from "react";

import ons from "onsenui";
import { Navigator, Page, PullHook, BackButton, Toolbar } from "react-onsenui";
//import  {Page, PullHook} from 'react-onsenui';

//import CacheBuster from '../../CacheBuster';
//import Login from '../Login'
import Home from "../Home";
import GamePlayScreen from "../../components/GamePlayScreen";
import Dice from "../../components/Dice";
import BoosterCards from "../../components/BoosterCards";
import BoosterCardContainer from "../BoosterCardContainer";

const refreshCacheAndReload = () => {
  console.log("Clearing cache and hard reloading...");
  if (caches) {
    // Service worker cache should be cleared with caches.delete()
    caches.keys().then(function(names) {
      for (let name of names) caches.delete(name);
    });
  }
  // delete browser cache and hard reload
  window.location.reload(true);
};

class App extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.pushPage = this.pushPage.bind(this);
    this.renderPage = this.renderPage.bind(this);
  }
  renderToolbar(route, navigator) {
    const backButton = route.hasBackButton ? (
      <BackButton onClick={() => this.handleBackButtonClick(navigator)}>
        Back
      </BackButton>
    ) : null;

    return (
      <Toolbar>
        <div className="left">{backButton}</div>
        <div className="center">{route.title}</div>
      </Toolbar>
    );
  }
  handleBackButtonClick(navigator) {
    ons.notification
      .confirm("Are you sure you want to go back?")
      .then(response => {
        if (response === 1) {
          navigator.popPage();
        }
      });
  }
  pushPage(navigator, pageTitle, additionalProps) {
    navigator.pushPage({
      title: pageTitle,
      hasBackButton: true,
      additionalProps
    });
  }
  renderPage(route, navigator) {
    switch (route.title) {
      case "Game":
        return (
          <Page
            key={route.title}
            renderToolbar={this.renderToolbar.bind(this, route, navigator)}
          >
            <GamePlayScreen teams={route.additionalProps.teams} />
          </Page>
        );
      case "30 Seconds App - Home":
        return (
          <Page
            key={route.title}
            renderToolbar={this.renderToolbar.bind(this, route, navigator)}
          >
            <PullHook onPull={refreshCacheAndReload}></PullHook>
            <Home
              className="App"
              pushPage={this.pushPage}
              navigator={navigator}
            />
          </Page>
        );
      case "Dice":
        return (
          <Page
            key={route.title}
            renderToolbar={this.renderToolbar.bind(this, route, navigator)}
          >
            <Dice />
          </Page>
        );
      case "New Cards":
        return (
          <Page
            key={route.title}
            renderToolbar={this.renderToolbar.bind(this, route, navigator)}
          >
            <BoosterCardContainer category={"SPORT"} />
          </Page>
        );
      default:
        return <div>404 - page not found</div>;
    }
  }
  render() {
    return (
      <Navigator
        swipeable
        renderPage={this.renderPage}
        initialRoute={{
          title: "30 Seconds App - Home",
          hasBackButton: false
        }}
      />
    );
  }
}

// class App extends Component  {
//   render(){
//   return (
//     <CacheBuster data-test= "CacheBusterApp">
//       {({ loading, isLatestVersion, refreshCacheAndReload }) => {
//         if (loading) return null;
//         if (!loading && !isLatestVersion) {
//           // You can decide how and when you want to force reload
//           refreshCacheAndReload();
//         }
//         return(
//             <div className="App" >
//               <Login />
//             </div>
//         );
//       }}
//     </CacheBuster>

//   );
//   }
// }

export default App;

// <header className="App-header">
// {//Must be atleast one header - PWA Accessibility Testing
// }
//   <h1>React PWA</h1>
//   <img src={logo} className="App-logo" alt="logo" />
//   <p>
//     Edit <code>src/App.js</code> and save to reload.
//   </p>
//   {//Must be atleast one skip link - PWA Accessibility Testing
//   }
//   <a
//     className="App-link skip-link"
//     href="#maincontent"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     Skip to Main
//   </a>
// </header>
// {//Skip link skips to here - PWA Accessibility Testing
// }
// <main id="maincontent">
//     <p>main</p>
// </main>
