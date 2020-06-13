import React, { Component } from "react";

import ons from "onsenui";
import { Navigator, Page, PullHook, BackButton, Toolbar } from "react-onsenui";
//import Tour from "reacttour";
//import  {Page, PullHook} from 'react-onsenui';

//import CacheBuster from '../../CacheBuster';
//import Login from '../Login'
import Home from "../Home";
import GamePlayScreen from "../../components/GamePlayScreen";
// import MultiPlayScreen from "../../components/MultiPlayScreen";
import MultiPlayContainer from "../MultiPlayContainer";
//import GamePlayContainer from "../GamePlayContainer"

import Dice from "../../components/Dice";
import BoosterCards from "../../components/BoosterCards";
import BoosterCardContainer from "../BoosterCardContainer";

//below are imports for demoPage:

import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import Demo from "../../components/Demo";
//import Login from "../../components/test/HelloWorldAlert";
import Tour from "reactour";
// import Text from "../../components/Demo/Text.js";
// import Glitch from "../../components/Demo/Glitch.js";
// import Tooltip from "../../components/Demo/Tooltip.js";
// import { Link } from "../../components/Demo/Button.js";
import "./styles.css";

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
    this.state = {
      isTourOpen: false,
      isShowingMore: false
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.pushPage = this.pushPage.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.disableBody = this.disableBody.bind(this);
    this.enableBody = this.disableBody.bind(this);
    this.toggleShowMore = this.toggleShowMore.bind(this);
    this.closeTour = this.closeTour.bind(this);
    this.openTour = this.openTour.bind(this);
  }

  disableBody = target => disableBodyScroll(target);
  enableBody = target => enableBodyScroll(target);

  toggleShowMore = () => {
    this.setState(prevState => ({
      isShowingMore: !prevState.isShowingMore
    }));
  };

  closeTour = () => {
    this.setState({ isTourOpen: false });
  };

  openTour = () => {
    this.setState({ isTourOpen: true });
  };

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
    const accentColor = "#5cb7b7";
    switch (route.title) {
      case "Game":
        return (
          <Page
            key={route.title}
            renderToolbar={this.renderToolbar.bind(this, route, navigator)}
          >
            {this.props.firebaseAnalytics().logEvent("New Game being played")}
            <GamePlayScreen
              firebaseAnalytics={this.props.firebaseAnalytics}
              teams={route.additionalProps.teams}
              fullCategories={route.additionalProps.fullCategories}
            />
          </Page>
        );
      case "ZouZou - Home":
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
            firebaseAnalytics={this.props.firebaseAnalytics}
            key={route.title}
            renderToolbar={this.renderToolbar.bind(this, route, navigator)}
          >
            {this.props.firebaseAnalytics().logEvent("Booster Dice being used")}
            <Dice />
          </Page>
        );
      case "New Cards":
        return (
          <Page
            firebaseAnalytics={this.props.firebaseAnalytics}
            key={route.title}
            renderToolbar={this.renderToolbar.bind(this, route, navigator)}
          >
            <BoosterCards
              pushPage={this.pushPage}
              navigator={navigator}
              coreCategories={route.additionalProps.coreCategories}
              fullCategories={route.additionalProps.fullCategories}
            />
          </Page>
        );
      case "boosterCard":
        return (
          <Page
            firebaseAnalytics={this.props.firebaseAnalytics}
            key={route.title}
            renderToolbar={this.renderToolbar.bind(this, route, navigator)}
          >
            {this.props
              .firebaseAnalytics()
              .logEvent("Booster Cards being used", {
                category: route.additionalProps.category
              })}
            <BoosterCardContainer
              category={route.additionalProps.category}
              fullCategories={route.additionalProps.fullCategories}
            />
          </Page>
        );
      case "MultiplayerGame":
        return (
          <Page
            firebaseAnalytics={this.props.firebaseAnalytics}
            key={route.title}
            renderToolbar={this.renderToolbar.bind(this, route, navigator)}
          >
            <MultiPlayContainer
              firebaseAnalytics={this.props.firebaseAnalytics}
              teams={route.additionalProps.teams}
              fullCategories={route.additionalProps.fullCategories}
              level={route.additionalProps.level}
              disableBtnJoin={true}
            />
          </Page>
        );
      case "MultiPhone":
        return (
          <Page
            firebaseAnalytics={this.props.firebaseAnalytics}
            key={route.title}
            renderToolbar={this.renderToolbar.bind(this, route, navigator)}
          >
            <MultiPlayContainer
              firebaseAnalytics={this.props.firebaseAnalytics}
              teams={route.additionalProps.teams}
              fullCategories={route.additionalProps.fullCategories}
              level={route.additionalProps.level}
              disableBtnJoin={true}
              disableVideo={true}
            />
          </Page>
        );
      case "Demo":
        return (
          <Page
            firebaseAnalytics={this.props.firebaseAnalytics}
            key={route.title}
            renderToolbar={this.renderToolbar.bind(this, route, navigator)}
          >
            <Demo
              openTour={this.openTour}
              toggleShowMore={this.toggleShowMore}
              isShowingMore={this.state.isShowingMore}
            />
            <Tour
              onRequestClose={this.closeTour}
              steps={tourConfig}
              isOpen={this.state.isTourOpen}
              maskClassName="mask"
              className="helper"
              rounded={5}
              accentColor={accentColor}
              onAfterOpen={this.disableBody}
              onBeforeClose={this.enableBody}
            />
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
          title: "ZouZou - Home",
          hasBackButton: false
        }}
      />
    );
  }
}

const tourConfig = [
  {
    selector: '[data-tut="reactour__socialLinks"]',
    content: `We want our game to be as fun to play as it was to build...`
  },
  {
    selector: '[data-tut="reactour__nav"]',
    content: ({ goTo }) => (
      <div>
        Let's Go! We will start with NAVIGATION. If you want to skip to the
        RULES:
        <button
          style={{
            border: "1px solid #f7f7f7",
            background: "none",
            padding: ".3em .7em",
            fontSize: "inherit",
            display: "block",
            cursor: "pointer",
            margin: "1em auto"
          }}
          onClick={() => goTo(12)}
        >
          CLICK HERE
        </button>
      </div>
    )
  },
  {
    selector: '[data-tut="reactour__boosters"]',
    content: `Boosters are probably our easiest to use. If you have a board, try them out...`
  },
  {
    selector: '[data-tut="reactour__offline"]',
    content: `No data? No problem. We got you with Offline Mode :).`
  },
  {
    selector: '[data-tut="reactour__two_types"]',
    content: `Get your phones ready. Get your friends ready!`
  },
  {
    selector: '[data-tut="reactour__create_room"]',
    content: `Time to create a safe space to obliterate your opponents`
  },
  {
    selector: '[data-tut="reactour__share_link"]',
    content: `We have made easy to congregate`
  },
  {
    selector: '[data-tut="reactour__join_game"]',
    content: `Just your name to get in...`
  },
  {
    selector: '[data-tut="reactour__lets_play"]',
    content: `Everyone sees what everyone's doing. Cozy isn't it?`
  },
  {
    selector: '[data-tut="reactour__end_of_round"]',
    content: `Always. Audit. The card.`
  },
  {
    selector: '[data-tut="reactour__video_call"]',
    content: `Turn on the video to see how silly everyone looks when they describe :D`
  },
  {
    selector: '[data-tut="reactour__enjoy"]',
    content: `Excuse the crustiness...`
  },
  {
    selector: '[data-tut="reactour__rules"]',
    content: ({ goTo }) => (
      <div>
        If you want to go back to beginning of NAVIGATION: RULES:
        <button
          style={{
            border: "1px solid #f7f7f7",
            background: "none",
            padding: ".3em .7em",
            fontSize: "inherit",
            display: "block",
            cursor: "pointer",
            margin: "1em auto"
          }}
          onClick={() => goTo(1)}
        >
          CLICK HERE
        </button>
      </div>
    )
  }
];

// {
//   selector: '[data-tut="reactour__style"]',
//   content: () => (
//     <div>
//       <Glitch data-glitch="Styled">Styled</Glitch>
//       <Text color="#e5e5e5">
//         The <Tooltip data-tooltip="this helper ⬇">tourist guide</Tooltip>{" "}
//         could be dressed in any way, using custom components, styles and so
//         on…
//       </Text>
//       <Text color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
//         <Link
//           href="http://codepen.io/lbebber/full/ypgql/"
//           color="dark"
//           nospaces
//         >
//           Text effect
//         </Link>{" "}
//         by{" "}
//         <Link href="https://twitter.com/lucasbebber" color="dark" nospaces>
//           Lucas Bebber
//         </Link>
//       </Text>
//     </div>
//   ),
//   style: {
//     backgroundColor: "black",
//     color: "white"
//   }
// },
// {
//   selector: '[data-tut="reactour__position"]',
//   content: () => (
//     <Text>
//       The <Tooltip data-tooltip="this helper ⬇">tourist guide</Tooltip> could
//       be positioned where you want.
//       <br /> In this case will try to stay in the <strong>
//         left side
//       </strong>{" "}
//       if there's available space, otherwise will{" "}
//       <strong>auto position</strong>.
//     </Text>
//   ),
//   position: "left"
// },
// {
//   selector: '[data-tut="reactour__scroll"]',
//   content:
//     "Probably you noted that the Tour scrolled directly to the desired place, and you could control the time also…"
// },
// {
//   selector: '[data-tut="reactour__scroll--hidden"]',
//   content: "Also when places are pretty hidden…"
// },
// {
//   selector: '[data-tut="reactour__action"]',
//   content:
//     "When arrived on each place you could fire an action, like… (look at the console)",
//   action: () =>
//     console.log(`
//                 ------------🏠🏚---------
//     🚌 Arrived to explore these beautiful buildings! 🚌
//                 ------------🏠🏚---------
//  🚧 This action could also fire a method in your Component 🚧
//   `)
// } ,
// {
//   selector: '[data-tut="reactour__state"]',
//   content:
//     "And the Tour could be observing changes to update the view, try clicking the button…",
//   observe: '[data-tut="reactour__state--observe"]'
// }

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
