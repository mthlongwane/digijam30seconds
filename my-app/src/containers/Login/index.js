import React, { Component } from "react";

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
  Page
} from "react-onsenui";

//import HelloWorldAlert from '../../components/test/HelloWorldAlert'
import GamePlayScreen from "../../components/GamePlayScreen";

export default class Login extends Component {
  constructor() {
    super();
    this.state = { isSideBarOpen: false };
    this.renderToolbar = this.renderToolbar.bind(this);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
  }
  renderToolbar() {
    return (
      <Toolbar>
        <div className="left">
          <ToolbarButton onClick={this.show}>
            <Icon icon="md-menu" />
          </ToolbarButton>
        </div>
        <div className="center">ZouZou - Home</div>
      </Toolbar>
    );
  }
  hide() {
    this.setState({ isSideBarOpen: false });
  }
  show() {
    this.setState({ isSideBarOpen: true });
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
          onClose={this.hide}
          onOpen={this.show}
        >
          <Page>
            <List
              dataSource={["New Game", "Boosters", "Settings"]}
              renderRow={title => (
                <ListItem key={title} onClick={this.hide} tappable>
                  {title}
                </ListItem>
              )}
            />
          </Page>
        </SplitterSide>
        <SplitterContent>
          <Page renderToolbar={this.renderToolbar}>
            <section style={{ margin: "16px" }}></section>
          </Page>
        </SplitterContent>
      </Splitter>
    );
  }
}
