import React, { Component } from "react";

// import ons  from 'onsenui';
 import {Toolbar, ToolbarButton, Icon, 
    List, ListItem,
    Splitter , SplitterSide, SplitterContent, 
    Page, Row,
    ActionSheet, ActionSheetButton
  
  } from 'react-onsenui';

//import HelloWorldAlert from '../../components/test/HelloWorldAlert'
import GamePlayScreen from "../../components/GamePlayScreen";

export default class Home extends Component {
    constructor(){
        super()
        this.state = {isSideBarOpen: false, isActionSheetOpen: false}
        this.renderToolbar = this.renderToolbar.bind(this)
        this.hideSideBar = this.hideSideBar.bind(this)
        this.showSideBar =  this.showSideBar.bind(this)
        this.handleNewGame = this.handleNewGame.bind(this)
        this.cancelNewGameActionSheet =   this.cancelNewGameActionSheet.bind(this)
        this.openNewGameActionSheet =   this.openNewGameActionSheet.bind(this)
        
    }
    renderToolbar() {
        return (
            <Toolbar>
                <div className='left'>
                    <ToolbarButton onClick={this.showSideBar}>
                    <Icon icon='md-menu' />
                    </ToolbarButton>
                </div>
                <div className='center'>30 Seconds App - Home</div>
            </Toolbar>
        );
    }
    hideSideBar() {
        this.setState(prevState=>{return {...prevState, isSideBarOpen: false}});
     }
    showSideBar() {
        this.setState(prevState=> {return {...prevState,isSideBarOpen: true}});
    }   
    cancelNewGameActionSheet(){
        this.setState(prevState=> {return {...prevState,isActionSheetOpen: false}});
    }
    openNewGameActionSheet(){
        this.setState(prevState=> {return {...prevState,isActionSheetOpen: true}});
    }
    handleNewGame(numTeams){
        alert(numTeams)  ;    
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
          onClose={this.hideSideBar}
          onOpen={this.showSideBar}
        >
          <Page>
            <List
              dataSource={['New Game', 'Boosters', 'Settings']}
              renderRow={(title) => (
                title==='New Game'?
                  <ListItem key={title} onClick={this.openNewGameActionSheet} tappable>{title}</ListItem>
                :
                  <ListItem key={title} onClick={this.hideSideBar} tappable>{title}</ListItem>
                

              )}
            />
          </Page>
        </SplitterSide>
        <SplitterContent>
          <Page renderToolbar={this.renderToolbar}>
                <section  style={{margin: '16px'}}>
                  <Row onClick={this.openNewGameActionSheet} className="sections flexbox-container-center "  style={{backgroundColor: '#ffd202'}}>
                    <Row className="flexbox-container-center">
                      <h1 style={{padding: '0px'}}>New Game</h1> 
                    </Row>
                    <Row className="flexbox-container-center sections-text">
                      <p >Lets the games begin!</p>
                    </Row>
                  </Row>
                  <br></br>
                  <Row className="sections flexbox-container-center " style={{backgroundColor: '#ffe795'}}>
                    <Row className="flexbox-container-center">
                      <h1 style={{padding: '0px'}}>Boosters</h1> 
                    </Row>
                    <Row className="flexbox-container-center sections-text">
                      <p>Have the game at home but in need of a new pack of cards or a dice?</p>
                    </Row>
                   
                    
                  </Row>
                </section>
                <ActionSheet isOpen={this.state.isActionSheetOpen} animation='default'
                    onCancel={this.cancelNewGameActionSheet}
                    isCancelable={true}
                    title={'Number of Teams:'}
                  >
                    <ActionSheetButton onClick={()=>{this.handleNewGame(1)}}>1</ActionSheetButton>
                    <ActionSheetButton onClick={()=>{this.handleNewGame(2)}}>2</ActionSheetButton>
                    <ActionSheetButton onClick={()=>{this.handleNewGame(3)}} >3</ActionSheetButton>
                    <ActionSheetButton onClick={()=>{this.handleNewGame(4)}} >4</ActionSheetButton>
                    <ActionSheetButton onClick={this.cancelNewGameActionSheet} icon={'md-close'}>Cancel</ActionSheetButton>
                  </ActionSheet>

          </Page>
        </SplitterContent>
      </Splitter>      
    );
  }
}
