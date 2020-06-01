import React, { Component } from "react";
import Logo from "./zouzou_logo.png";

import cardItemArray from "../../localDatafiles/card-data_Main.json";
import { chooseInitialCategories } from "../../helperFunctions/cardPicker";

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
  Row,
  ActionSheet,
  ActionSheetButton
} from "react-onsenui";

//import HelloWorldAlert from '../../components/test/HelloWorldAlert'

const newCardItemArray = cardItemArray;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSideBarOpen: false,
      isNewGameActionSheetOpen: false,
      isBoosterActionSheetOpen: false,
      isLevelActionSheetOpen: false,
      tracker: null
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
    this.openLevelActionSheet = this.openLevelActionSheet.bind(this);
    this.cancelLevelActionSheet = this.cancelLevelActionSheet.bind(this);
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
  openLevelActionSheet(val) {
    this.setState(prevState => {
      return {
        ...prevState,
        isLevelActionSheetOpen: true,
        isNewGameActionSheetOpen: false,
        isBoosterActionSheetOpen: false,
        tracker: val
      };
    });
  }
  cancelLevelActionSheet() {
    this.setState(prevState => {
      return { ...prevState, isLevelActionSheetOpen: false };
    });
  }
  handleLevel(level) {
    this.setState(prevState => {
      return {
        ...prevState,
        isLevelActionSheetOpen: false
      };
    });

    var categoriesSelected = chooseInitialCategories(newCardItemArray, level);
    this.state.tracker === "New Cards"
      ? this.props.pushPage(this.props.navigator, "New Cards", {
          categories: categoriesSelected
        })
      : this.props.pushPage(this.props.navigator, "Game", {
          teams: this.state.tracker,
          categories: categoriesSelected
        });
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
              dataSource={["New Game", "Boosters", "Settings"]}
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
          <Page /*renderToolbar={this.renderToolbar} */>
            <div className="flexbox-container-center">
              <img src={Logo} className="sections-img" alt="App Logo" />
            </div>
            <section style={{ margin: "16px", marginTop: "0px" }}>
              <Row
                onClick={this.openNewGameActionSheet}
                className="sections flexbox-container-center "
                style={{ backgroundColor: "#ffd202" }}
              >
                <Row className="flexbox-container-center">
                  <h1 style={{ padding: "0px" }}>New Game</h1>
                </Row>
                <Row className="flexbox-container-center sections-text">
                  <p>Lets the games begin!</p>
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
                  <p>
                    Have the game at home but in need of a new pack of cards or
                    a dice?
                  </p>
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
                  this.openLevelActionSheet(2);
                }}
              >
                2
              </ActionSheetButton>
              <ActionSheetButton
                onClick={() => {
                  this.openLevelActionSheet(3);
                }}
              >
                3
              </ActionSheetButton>
              <ActionSheetButton
                onClick={() => {
                  this.openLevelActionSheet(4);
                }}
              >
                4
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
                  this.openLevelActionSheet("New Cards");
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
                Expert
              </ActionSheetButton>

              <ActionSheetButton
                onClick={this.cancelLevelActionSheet}
                icon={"md-close"}
              >
                Cancel
              </ActionSheetButton>
            </ActionSheet>
          </Page>
        </SplitterContent>
      </Splitter>
    );
  }
}
