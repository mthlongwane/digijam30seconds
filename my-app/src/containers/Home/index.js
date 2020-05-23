import React, { Component } from "react";

// import ons  from 'onsenui';
 import {Toolbar, ToolbarButton, Icon, 
    List, ListItem,
    Splitter , SplitterSide, SplitterContent, 
    Page,  Row} from 'react-onsenui';

//import HelloWorldAlert from '../../components/test/HelloWorldAlert'
import GamePlayScreen from "../../components/GamePlayScreen";

export default class Home extends Component {
    constructor(){
        super()
        this.state = {isSideBarOpen: false}
        this.renderToolbar = this.renderToolbar.bind(this)
        this.hide = this.hide.bind(this)
        this.show =  this.show.bind(this)

    }
    renderToolbar() {
        return (
            <Toolbar>
                <div className='left'>
                    <ToolbarButton onClick={this.show}>
                    <Icon icon='md-menu' />
                    </ToolbarButton>
                </div>
                <div className='center'>30 Seconds App - Home</div>
            </Toolbar>
        );
    }
    hide() {
        this.setState({isSideBarOpen: false});
     }
    show() {
        this.setState({isSideBarOpen: true});
    }   
  render() {
    return (
        <Splitter>
        <SplitterSide
          style={{
              boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
          }}
          side='left'
          width={200}
          collapse={true}
          swipeable={true}
          isOpen={this.state.isSideBarOpen}
          onClose={this.hide}
          onOpen={this.show}
        >
          <Page>
            <List
              dataSource={['New Game', 'Boosters', 'Settings']}
              renderRow={(title) => (
                <ListItem key={title} onClick={this.hide} tappable>{title}</ListItem>
              )}
            />
          </Page>
        </SplitterSide>
        <SplitterContent>
          <Page renderToolbar={this.renderToolbar}>
                <section  style={{margin: '16px'}}>
                  <Row className="flexbox-container-center sections"  style={{backgroundColor: '#ffd202'}}>
                    <Row className="flexbox-container-center">
                      <h1 style={{padding: '0px'}}>New Game</h1> 
                    </Row>
                    <Row className="flexbox-container-center sections-text">
                      <p >Lets the games begin!</p>
                    </Row>
                  </Row>
                  <br></br>
                  <Row className="flexbox-container-center sections" style={{backgroundColor: '#ffe795'}}>
                    <Row className="flexbox-container-center">
                      <h1 style={{padding: '0px'}}>Boosters</h1> 
                    </Row>
                    <Row className="flexbox-container-center sections-text">
                      <p>Have the game at home but in need of a new pack of cards or a dice?</p>
                    </Row>
                   
                    
                  </Row>
                </section>
                
          </Page>
        </SplitterContent>
      </Splitter>      
    );
  }
}
