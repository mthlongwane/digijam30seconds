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
            <p className="side-text_prop">RESPUBLICA</p>
          </aside>
        )}
        {this.props.disabled ? null : (
          <List modifier="listGameCard">
            <ListHeader modifier="listHeaderGameCard">
              {this.props.categoryHead}
            </ListHeader>
            {this.props.cardItems.map((item, index) => {
              return <ListItem key={index}> {item}</ListItem>;
            })}
          </List>
        )}
        {this.props.disabled ? null : (
          <aside className="side-block_prop">
            <p className="side-text_prop">RESPUBLICA</p>
          </aside>
        )}
      </Card>
    );
  }
}
