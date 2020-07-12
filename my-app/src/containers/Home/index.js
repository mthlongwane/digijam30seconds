import React, { Component } from "react";
import Logo from "./zouzou_logo.png";
//import Helmet from "react-helmet";

import cardItemArray from "../../localDatafiles/card-data_Main.json";
import {
  chooseInitialCategories,
  chooseOtherCategory
} from "../../helperFunctions/cardPicker";

// import ons  from 'onsenui';

import {
  Toolbar,
  ToolbarButton,
  Icon,
  List,
  ListItem,
  Splitter,
  SplitterSide,
  SplitterContent,
  Page,
  PullHook,
  Row,
  ActionSheet,
  ActionSheetButton,
  Button,
  Col
} from "react-onsenui";

//import backgroundImg from "./zouzou_background.png";

//import HelloWorldAlert from '../../components/test/HelloWorldAlert'

//const newCardItemArray = cardItemArray;

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

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSideBarOpen: false,
      isNewGameActionSheetOpen: false,
      isNewGameMultiplayerActionSheetOpen: false,
      isBoosterActionSheetOpen: false,
      isMultiPhoneActionSheetOpen: false,
      isLevelActionSheetOpen: false,
      tracker: null,
      pullHookState: 'initial'
    };
    this.renderToolbar = this.renderToolbar.bind(this);
    this.hideSideBar = this.hideSideBar.bind(this);
    this.showSideBar = this.showSideBar.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
    this.cancelNewGameActionSheet = this.cancelNewGameActionSheet.bind(this);
    this.openNewGameActionSheet = this.openNewGameActionSheet.bind(this);
    this.handleBooster = this.handleBooster.bind(this);
    this.cancelBoosterActionSheet = this.cancelBoosterActionSheet.bind(this);
    this.openBoosterActionSheet = this.openBoosterActionSheet.bind(this);

    this.handleNewGameMultiplayer = this.handleNewGameMultiplayer.bind(this);
    this.cancelNewGameMultiplayerActionSheet = this.cancelNewGameMultiplayerActionSheet.bind(
      this
    );
    this.openNewGameMultiplayerActionSheet = this.openNewGameMultiplayerActionSheet.bind(
      this
    );

    this.openLevelActionSheet = this.openLevelActionSheet.bind(this);
    this.cancelLevelActionSheet = this.cancelLevelActionSheet.bind(this);

    this.openMultiPhoneActionSheet = this.openMultiPhoneActionSheet.bind(this);
    this.cancelMultiPhoneActionSheet = this.cancelMultiPhoneActionSheet.bind(
      this
    );
    this.openDemo = this.openDemo.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.getRefreshContent  =  this.getRefreshContent.bind(this)
    this.handleRefreshState = this.handleRefreshState.bind(this)
  }

  handleRefreshState(e) {
    this.setState({pullHookState: e.state});
  }
  handleRefresh(done) {
    // const data = this.getRandomData();

    setTimeout(() => {
      this.setState(done);
      refreshCacheAndReload()
    }, 500);
  }
  getRefreshContent() {
    switch (this.state.pullHookState) {
      case 'initial':
        return 'Pull to refresh';
      case 'preaction':
        return 'Release';
      case 'action':
        return 'Loading...';
      default:
          return 'Pull to refresh';
    }
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className="left">
          <ToolbarButton onClick={this.showSideBar}>
            <Icon icon="md-menu" />
          </ToolbarButton>
        </div>
        <div className="center">ZouZou - Home</div>
      </Toolbar>
    );
  }
  hideSideBar() {
    this.setState(prevState => {
      return { ...prevState, isSideBarOpen: false };
    });
  }
  showSideBar() {
    this.setState(prevState => {
      return { ...prevState, isSideBarOpen: true };
    });
  }
  cancelNewGameActionSheet() {
    this.setState(prevState => {
      return { ...prevState, isNewGameActionSheetOpen: false };
    });
  }
  openNewGameActionSheet() {
    this.setState(prevState => {
      return { ...prevState, isNewGameActionSheetOpen: true };
    });
  }
  handleNewGame(numTeams) {
    this.setState(prevState => {
      return { ...prevState, isNewGameActionSheetOpen: false };
    });
    this.props.pushPage(this.props.navigator, "Game", { teams: numTeams });
  }
  cancelBoosterActionSheet() {
    this.setState(prevState => {
      return { ...prevState, isBoosterActionSheetOpen: false };
    });
  }
  openBoosterActionSheet() {
    this.setState(prevState => {
      return { ...prevState, isBoosterActionSheetOpen: true };
    });
  }
  handleBooster(page) {
    this.setState(prevState => {
      return { ...prevState, isBoosterActionSheetOpen: false };
    });
    this.props.pushPage(this.props.navigator, page, {});
  }
  cancelNewGameMultiplayerActionSheet() {
    this.setState(prevState => {
      return { ...prevState, isNewGameMultiplayerActionSheetOpen: false };
    });
  }
  openNewGameMultiplayerActionSheet() {
    this.setState(prevState => {
      return { ...prevState, isNewGameMultiplayerActionSheetOpen: true };
    });
  }
  handleNewGameMultiplayer(numTeams) {
    this.setState(prevState => {
      return { ...prevState, isNewGameMultiplayerActionSheetOpen: false };
    });
    this.props.pushPage(this.props.navigator, "MultiplayerGame", {
      teams: numTeams
    });
  }

  openLevelActionSheet(gameType, additionalParam) {
    this.setState(prevState => {
      return {
        ...prevState,
        isLevelActionSheetOpen: true,
        isNewGameActionSheetOpen: false,
        isBoosterActionSheetOpen: false,
        isNewGameMultiplayerActionSheetOpen: false,
        isMultiPhoneActionSheetOpen: false,
        tracker: [gameType, additionalParam]
      };
    });
  }

  openDemo() {
    this.setState(prevState => {
      return {
        ...prevState,
        isTourOpen: true
      };
    });
    this.props.pushPage(this.props.navigator, "Demo");
  }
  cancelLevelActionSheet() {
    this.setState(prevState => {
      return { ...prevState, isLevelActionSheetOpen: false };
    });
  }

  openMultiPhoneActionSheet() {
    this.setState(prevState => {
      return { ...prevState, isMultiPhoneActionSheetOpen: true };
    });
  }

  cancelMultiPhoneActionSheet() {
    this.setState(prevState => {
      return { ...prevState, isMultiPhoneActionSheetOpen: false };
    });
  }

  handleLevel(level) {
    this.setState(prevState => {
      return {
        ...prevState,
        isLevelActionSheetOpen: false
      };
    });

    var coreCategories = chooseInitialCategories(cardItemArray, level);
    var fullCategories = coreCategories.concat(
      chooseOtherCategory(cardItemArray, level)
    );
    if (this.state.tracker[0] === "New Cards") {
      this.props.pushPage(this.props.navigator, "New Cards", {
        coreCategories: coreCategories,
        fullCategories: fullCategories
      });
    } else if (this.state.tracker[0] === "Game") {
      this.props.pushPage(this.props.navigator, "Game", {
        teams: this.state.tracker[1],
        fullCategories: fullCategories
      });
    } else if (this.state.tracker[0] === "MultiplayerGame") {
      this.props.pushPage(this.props.navigator, "MultiplayerGame", {
        teams: this.state.tracker[1],
        fullCategories: fullCategories,
        level: level
      });
    } else if (this.state.tracker[0] === "MultiPhone") {
      this.props.pushPage(this.props.navigator, "MultiPhone", {
        teams: this.state.tracker[1],
        fullCategories: fullCategories,
        level: level
      });
    }
  }
  render() {
    return (
      <Splitter>
        <SplitterSide
          style={{
            boxShadow:
              "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
          }}
          side="left"
          width={200}
          collapse={true}
          swipeable={true}
          isOpen={this.state.isSideBarOpen}
          onClose={this.hideSideBar}
          onOpen={this.showSideBar}
        >
          <Page>
            <List
              style={{ marginTop: "60px" }}
              dataSource={[
                "New Game",
                "Boosters",
                "Multiplayer Online",
                "Settings"
              ]}
              renderRow={title =>
                title === "New Game" ? (
                  <ListItem
                    key={title}
                    onClick={this.openNewGameActionSheet}
                    tappable
                  >
                    {title}
                  </ListItem>
                ) : title === "Boosters" ? (
                  <ListItem
                    key={title}
                    onClick={this.openBoosterActionSheet}
                    tappable
                  >
                    {title}
                  </ListItem>
                ) : title === "Multiplayer Online" ? (
                  <ListItem
                    key={title}
                    onClick={this.openNewGameMultiplayerActionSheet}
                    tappable
                  >
                    {title}
                  </ListItem>
                ) : (
                  <ListItem key={title} onClick={this.hideSideBar} tappable>
                    {title}
                  </ListItem>
                )
              }
            />
          </Page>
        </SplitterSide>
        <SplitterContent>
          <Page
          /*renderToolbar={this.renderToolbar} */
          >
          <PullHook onPull={ this.handleRefreshState /* refreshCacheAndReload */} onLoad={this.handleRefresh}>
            {
              this.getRefreshContent()
            }
          </PullHook>
            <div className="page__background">
              <div className="flexbox-container-center">
                <img src={Logo} className="sections-img" alt="App Logo" />
              </div>
              <Row className="flexbox-container-center">
                <Col className="flexbox-item-center-noGrow">
                  <Button onClick={this.openDemo}>
                    Want to learn how to play?
                  </Button>
                </Col>
              </Row>
              <br></br>
              <section style={{ margin: "16px", marginTop: "0px" }}>
                <Row
                  onClick={this.openNewGameActionSheet}
                  className="sections flexbox-container-center "
                  style={{ backgroundColor: "#ffe795" }}
                >
                  <Row className="flexbox-container-center">
                    <h1 style={{ padding: "0px" }}>Offline Mode</h1>
                  </Row>
                  <Row className="flexbox-container-center sections-text">
                    <p>
                      Sharing one phone or low on data? Let the games begin!
                    </p>
                  </Row>
                </Row>
                <br></br>
                <Row
                  onClick={this.openMultiPhoneActionSheet}
                  className="sections flexbox-container-center "
                  style={{ backgroundColor: "#ffd202" }}
                >
                  <Row className="flexbox-container-center">
                    <h1 style={{ padding: "0px" }}>Multiple Phones</h1>
                  </Row>
                  <Row className="flexbox-container-center sections-text">
                    <p>All the players in the same building? </p>
                  </Row>
                </Row>
                <br></br>
                <Row
                  onClick={this.openBoosterActionSheet}
                  className="sections flexbox-container-center "
                  style={{ backgroundColor: "#ffe795" }}
                >
                  <Row className="flexbox-container-center">
                    <h1 style={{ padding: "0px" }}>Boosters</h1>
                  </Row>
                  <Row className="flexbox-container-center sections-text">
                    <p>Need a new pack of cards or a die?</p>
                  </Row>
                </Row>
                <br></br>
                <Row
                  onClick={this.openNewGameMultiplayerActionSheet}
                  className="sections flexbox-container-center "
                  style={{ backgroundColor: "#ffd202" }}
                >
                  <Row className="flexbox-container-center">
                    <h1 style={{ padding: "0px" }}>MultiPhone + Video</h1>
                  </Row>
                  <Row className="flexbox-container-center sections-text">
                    <p>Want to play a game via video call? </p>
                    <p>Let the games begin!</p>
                  </Row>
                </Row>
              </section>
              <ActionSheet
                isOpen={this.state.isNewGameActionSheetOpen}
                animation="default"
                onCancel={this.cancelNewGameActionSheet}
                isCancelable={true}
                title={"Number of Teams Playing:"}
              >
                <ActionSheetButton
                  onClick={() => {
                    this.openLevelActionSheet("Game", 2);
                  }}
                >
                  2 (Game On!)
                </ActionSheetButton>
                <ActionSheetButton
                  onClick={() => {
                    this.openLevelActionSheet("Game", 3);
                  }}
                >
                  3 (It's a Crowd!)
                </ActionSheetButton>
                <ActionSheetButton
                  onClick={() => {
                    this.openLevelActionSheet("Game", 4);
                  }}
                >
                  4 (Awesome Foursome!)
                </ActionSheetButton>
                <ActionSheetButton
                  onClick={this.cancelNewGameActionSheet}
                  icon={"md-close"}
                >
                  Cancel
                </ActionSheetButton>
              </ActionSheet>
              <ActionSheet
                isOpen={this.state.isBoosterActionSheetOpen}
                animation="default"
                onCancel={this.cancelBoosterActionSheet}
                isCancelable={true}
                title={"Select a Booster:"}
              >
                <ActionSheetButton
                  onClick={() => {
                    this.handleBooster("Dice");
                  }}
                >
                  Dice
                </ActionSheetButton>
                <ActionSheetButton
                  onClick={() => {
                    this.openLevelActionSheet("New Cards", null);
                  }}
                >
                  New Cards
                </ActionSheetButton>

                <ActionSheetButton
                  onClick={this.cancelBoosterActionSheet}
                  icon={"md-close"}
                >
                  Cancel
                </ActionSheetButton>
              </ActionSheet>
              <ActionSheet
                isOpen={this.state.isNewGameMultiplayerActionSheetOpen}
                animation="default"
                onCancel={this.cancelNewGameMultiplayerActionSheet}
                isCancelable={true}
                title={"Number of Teams Playing:"}
              >
                <ActionSheetButton
                  onClick={() => {
                    this.openLevelActionSheet("MultiplayerGame", 2);
                  }}
                >
                  2 (Game On!)
                </ActionSheetButton>
                <ActionSheetButton
                  onClick={() => {
                    this.openLevelActionSheet("MultiplayerGame", 3);
                  }}
                >
                  3 (It's a Crowd!)
                </ActionSheetButton>
                <ActionSheetButton
                  onClick={() => {
                    this.openLevelActionSheet("MultiplayerGame", 4);
                  }}
                >
                  4 (Awesome Foursome!)
                </ActionSheetButton>
                <ActionSheetButton
                  onClick={this.cancelNewGameMultiplayerActionSheet}
                  icon={"md-close"}
                >
                  Cancel
                </ActionSheetButton>
              </ActionSheet>

              <ActionSheet
                isOpen={this.state.isMultiPhoneActionSheetOpen}
                animation="default"
                onCancel={this.cancelMultiPhoneActionSheet}
                isCancelable={true}
                title={"Number of Teams Playing:"}
              >
                <ActionSheetButton
                  onClick={() => {
                    this.openLevelActionSheet("MultiPhone", 2);
                  }}
                >
                  2 (Game On!)
                </ActionSheetButton>
                <ActionSheetButton
                  onClick={() => {
                    this.openLevelActionSheet("MultiPhone", 3);
                  }}
                >
                  3 (It's a Crowd!)
                </ActionSheetButton>
                <ActionSheetButton
                  onClick={() => {
                    this.openLevelActionSheet("MultiPhone", 4);
                  }}
                >
                  4 (Awesome Foursome!)
                </ActionSheetButton>
                <ActionSheetButton
                  onClick={this.cancelMultiPhoneActionSheet}
                  icon={"md-close"}
                >
                  Cancel
                </ActionSheetButton>
              </ActionSheet>

              <ActionSheet
                isOpen={this.state.isLevelActionSheetOpen}
                animation="default"
                onCancel={this.cancelLevelActionSheet}
                isCancelable={true}
                title={"Choose Your Difficulty Level:"}
              >
                <ActionSheetButton
                  onClick={() => {
                    this.handleLevel("STANDARD");
                  }}
                >
                  Standard
                </ActionSheetButton>
                <ActionSheetButton
                  onClick={() => {
                    this.handleLevel("EXPERT");
                  }}
                >
                  Expert (Not for the faint-hearted!)
                </ActionSheetButton>

                <ActionSheetButton
                  onClick={this.cancelLevelActionSheet}
                  icon={"md-close"}
                >
                  Cancel
                </ActionSheetButton>
              </ActionSheet>
            </div>
          </Page>
        </SplitterContent>
      </Splitter>
    );
  }
}
