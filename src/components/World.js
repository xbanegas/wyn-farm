import React, { Component } from 'react';
import Row from './Row';
import Inventory from './Inventory';
import Craft from './Craft';
import {padNum, makeGrid} from '../utils/dataUtils';
import {genPlayerInitialLoc, chngLocID, genTreeLocs} from '../utils/worldUtils';
// import logo from '../logo.svg';
import initialData from '../initialData';
import '../css/World.css';


class World extends Component {
  constructor(props){
    super(props);
    this.state = initialData;
    this.state.player.location = genPlayerInitialLoc(this.state.world.size);
    this.state.world.trees = genTreeLocs(this.state.world.size, this.state.world.trees.total);
    this.makeWorldRows(this.state.player.location, this.state.player);
    this.handleKey = this.handleKey.bind(this);
    this.addCraftToInventory = this.addCraftToInventory.bind(this);
  }
  componentDidUpdate(){
    // console.log("world update");
  }

  makeWorldRows(playerLoc, player){
    this.grid = makeGrid(this.state.world.size);
    this.these_rows = [];
    let treeLocs = this.state.world.trees.locs;
    let trees = this.state.world.trees;
    this.grid.forEach((row, i)=>{
      this.these_rows.push(
        <Row 
          key={i} 
          styleName={`row row-${i}`} 
          worldSize={this.state.world.size} 
          playerLoc={playerLoc} 
          treeLocs={treeLocs}
          trees={trees}
          rowNum={padNum(i)} />
      );
    });
    this.setState({player: player});
  }
  
  handleKey(e){
    e.preventDefault();
    // Move Time Forward
    /**
     * @todo move clock to worldutils
     */
    let world = {...this.state.world};
    world.moveCount++;
    let moveCount = world.moveCount;
    if (!(moveCount < world.dayInterval)){ 
      world.moveCount = 0;
      world.dayCount++;
    }
    this.setState({world: world});
    // Handle Keypresses
    let worldSize = this.state.world.size;
    let player = {...this.state.player};
    let currentLoc = player.location;
    switch(e.key){
      case "w":
        player.location = chngLocID(worldSize, currentLoc, "vert", -1);
        this.playerLoc = player.location;
        break;
      case "a":
        player.location = chngLocID(worldSize, currentLoc, "horiz", -1);
        this.playerLoc = player.location;
        break;
      case "s":
        player.location = chngLocID(worldSize, currentLoc, "vert", 1);
        this.playerLoc = player.location;
        break;
      case "d":
        player.location = chngLocID(worldSize, currentLoc, "horiz", 1);
        this.playerLoc = player.location;
        break;
      case "f":
        console.log('farm');
        /**
         * @todo farming to worldUtils
         */
        let treeLocs = this.state.world.trees.locs
        if(treeLocs.includes(currentLoc)){
          player.inventory.forEach((item)=>{
            if (item.name === "wood") { item.count++; }
          });
          this.state.world.trees[currentLoc].supply--;
          if (this.state.world.trees[currentLoc].supply === 0){
            delete this.state.world.trees[currentLoc];
            treeLocs.splice(treeLocs.indexOf(currentLoc),1);
          }
        }
        break;
      default: 
        break;
      }
      

    this.makeWorldRows(this.playerLoc, player);
  }

  addCraftToInventory(item){
    // console.log(this.state);
    let player = {...this.state.player};
    let foundItem = false;
    player.inventory.forEach((playerItem)=>{
      if (playerItem.name === item.name){
        playerItem.count++;
        foundItem = true;
        player.inventory.forEach((subItem)=>{
          if (subItem.name === item.remove.name) {
            subItem.count -= item.remove.count;
          }
        });
      }
    });
    if (!foundItem) {
      let newItem = {name: item.name, count: 1};
      player.inventory.push(newItem);
      player.inventory.forEach((subItem)=>{
        if (subItem.name === item.remove.name) {
          subItem.count -= item.remove.count;
        }
      });
    }
    this.setState({player});
  }

  render() {
    return (
      <div className="world" onKeyPress={this.handleKey} tabIndex="0" >
        <div id="dayCount"><h4>Day: {this.state.world.dayCount}</h4></div>
        <div className="world-rows">
          {this.these_rows}
        </div>
        <Inventory playerItems={this.state.player.inventory} />
        <Craft playerItems={this.state.player.inventory} craft={this.addCraftToInventory} />
      </div>

    );
  }
}

export default World;
