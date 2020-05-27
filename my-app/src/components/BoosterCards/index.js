import React, { Component } from "react";
import cardItemArray from "../../localDatafiles/card-data_Main.json";
import { getCategories } from "../../helperFunctions/cardPicker";
import { Row } from "react-onsenui";

class BoosterCards extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleCategorySelected = this.handleCategorySelected.bind(this);
  }

  handleCategorySelected(category) {
    this.props.pushPage(this.props.navigator, "boosterCard", {
      category: category
    });
  }
  render() {
    return (
      <div>
        <section style={{ margin: "16px", marginTop: "20px" }}>
          <Row
            onClick={() => {
              this.handleCategorySelected("MIXED");
            }}
            className="sections flexbox-container-center "
            style={{ backgroundColor: "#ffe795" }}
          >
            <Row className="flexbox-container-center">
              <h3 style={{ padding: "0px" }}>{"MIXED"}</h3>
            </Row>
          </Row>
        </section>
        {getCategories(cardItemArray).map((category, index) => {
          return (
            <section key={index} style={{ margin: "16px", marginTop: "20px" }}>
              <Row
                key={index}
                onClick={() => {
                  this.handleCategorySelected(category);
                }}
                className="sections flexbox-container-center "
                style={{ backgroundColor: "#ffe795" }}
              >
                <Row key={index} className="flexbox-container-center">
                  <h3 key={index} style={{ padding: "0px" }}>
                    {category}
                  </h3>
                </Row>
              </Row>
            </section>
          );
        })}
      </div>
    );
  }
}

export default BoosterCards;
