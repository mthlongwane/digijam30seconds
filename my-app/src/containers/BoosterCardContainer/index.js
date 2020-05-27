import React, { Component } from "react";
import cardItemArray from "../../localDatafiles/card-data_Main.json";
import {
  selectCardFromCategory,
  selectCard
} from "../../helperFunctions/cardPicker";
import { Row, Col, Button } from "react-onsenui";
import GameCard from "../../components/GameCard";

const gameCards = cardItemArray;

class BoosterCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.category,
      cardArray: ["", "", "", "", ""],
      disableCard: false
    };
    this.handlePickUpCard = this.handlePickUpCard.bind(this);
    this.handleClearCard = this.handleClearCard.bind(this);
  }

  handleClearCard() {
    this.setState(oldstate => {
      return { ...oldstate, cardArray: ["", "", "", "", ""] };
    });
  }

  handlePickUpCard() {
    var newCard;
    if (this.props.category === "MIXED") {
      newCard = selectCard(gameCards);
    } else {
      newCard = selectCardFromCategory(cardItemArray, this.props.category);
    }
    this.setState(oldstate => {
      return { ...oldstate, cardArray: newCard };
    });
  }
  render() {
    return (
      <div>
        <br></br>
        <Row className="flexbox-container-center">
          <GameCard
            disabled={this.state.disableCard}
            cardItems={this.state.cardArray}
            categoryHead={this.props.category}
          />
        </Row>
        <br></br>
        <Row className="flexbox-container-even">
          <Col className="flexbox-item-center-noGrow">
            <Button
              onClick={this.handlePickUpCard}
              disabled={this.state.disableBtnPickup}
            >
              Pick up Card
            </Button>
          </Col>
          <Col className="flexbox-item-center-noGrow">
            <Button
              onClick={this.handleClearCard}
              disabled={this.state.disableBtnPickup}
            >
              Clear Card
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BoosterCards;
