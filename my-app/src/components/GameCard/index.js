import React, { Component } from "react";

import { Card, List, ListHeader, ListItem } from "react-onsenui";

//import fp from 'lodash/fp';

import "./index.scss";

export default class GameCard extends Component {
  render() {
    return (
      <Card modifier="cardGameCard">
        {this.props.disabled ? "Guess App" : null}
        {this.props.disabled ? null : (
          <aside className="side-block_prop">
            <p className="side-text_prop">Guess App</p>
          </aside>
        )}
        {this.props.disabled ? null : (
          <List modifier="listGameCard">
            <ListHeader modifier="listHeaderGameCard">Classic</ListHeader>
            {this.props.cardItems.map(item => {
              return <ListItem key={item}> {item}</ListItem>;
            })}
          </List>
        )}
        {this.props.disabled ? null : (
          <aside className="side-block_prop">
            <p className="side-text_prop">Guess App</p>
          </aside>
        )}
      </Card>
    );
  }
}
