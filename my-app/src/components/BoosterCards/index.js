import React, { Component } from "react";
import cardItemArray from "../../localDatafiles/card-data_Main.json";
import { getCategories } from "../../helperFunctions/cardPicker";
import { Row } from "react-onsenui";

class BoosterCards extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        {getCategories(cardItemArray).map((categories, index) => {
          return (
            <section key={index} style={{ margin: "16px", marginTop: "100px" }}>
              <Row
                key={index}
                onClick={this.openBoosterActionSheet}
                className="sections flexbox-container-center "
                style={{ backgroundColor: "#ffe795" }}
              >
                <Row key={index} className="flexbox-container-center">
                  <h3 key={index} style={{ padding: "0px" }}>
                    {categories}
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
