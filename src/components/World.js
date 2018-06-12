import React, { Component } from 'react';
import Row from './Row';
import Inventory from './Inventory';
import Craft from './Craft';
import {padNum, makeGrid} from '../utils/dataUtils';
import {genPlayerInitialLoc, chngLocID, genTreeLocs, genCarrotLocs} from '../utils/worldUtils';
// import logo from '../logo.svg';
import initialData from '../initialData';
import '../css/World.css';


class World extends Component {
  constructor(props){
    super(props);
    this.state = initialData;
    this.state.player.location = genPlayerInitialLoc(this.state.world.size);
    this.state.world.trees = genTreeLocs(this.state.world.size, this.state.world.trees.total);
    this.state.world.carrots = genCarrotLocs(this.state.world.size, this.state.world.carrots.total);
    this.makeWorldRows(this.state.player.location, this.state.player);
    this.handleKey = this.handleKey.bind(this);
    this.addCraftToInventory = this.addCraftToInventory.bind(this);
    console.log(this.state.player.health);
  }
  componentDidUpdate(){
    // console.log("world update");
  }

  makeWorldRows(playerLoc, player){
    this.grid = makeGrid(this.state.world.size);
    this.these_rows = [];
    let treeLocs = this.state.world.trees.locs;
    let trees = this.state.world.trees;
    let carrotLocs = this.state.world.carrots.locs;
    let carrots = this.state.world.carrots;
    let wallLocs = this.state.world.wallLocs;
    this.grid.forEach((row, i)=>{
      this.these_rows.push(
        <Row 
          key={i} 
          styleName={`row row-${i}`} 
          worldSize={this.state.world.size} 
          dayCount={this.state.world.dayCount}
          playerLoc={playerLoc} 
          treeLocs={treeLocs}
          trees={trees}
          rowNum={padNum(i)}
          carrotLocs={carrotLocs}
          carrots={carrots}
          wallLocs={wallLocs}
        />
      );
    });
    this.setState({player: player});
  }
  selectItem(keyPressed){ return keyPressed -1; }
  handleKey(e){
    e.preventDefault();
    // Move Time Forward
    /**
     * @todo move clock to worldutils
     */
    let world = {...this.state.world};
    let player = {...this.state.player};
    world.moveCount++;
    let moveCount = world.moveCount;
    if (!(moveCount < world.dayInterval)){ 
      world.moveCount = 0;
      world.dayCount++;
    }
    if (moveCount%10===0) {
      player.health--;
    }
    this.setState({world: world});
    this.setState({player: player});
    // Handle Keypresses
    let worldSize = this.state.world.size;
    let currentLoc = player.location;
    let keyPressed = e.key
    let thisItemSelection = this.state.player.itemSelected;
    let newLocID = "";
    console.log(this.state.world.carrots);
    switch(keyPressed){
      case "w":
        newLocID = chngLocID(worldSize, currentLoc, "vert", -1);
        if(!this.state.world.wallLocs.includes(newLocID)){
          player.location = newLocID
        }
        this.playerLoc = player.location;
        break;
      case "a":
        newLocID =  chngLocID(worldSize, currentLoc, "horiz", -1);
        if(!this.state.world.wallLocs.includes(newLocID)){
          player.location = newLocID
        }
        this.playerLoc = player.location;
        break;
      case "s":
        newLocID = chngLocID(worldSize, currentLoc, "vert", 1);
        if(!this.state.world.wallLocs.includes(newLocID)){
          player.location = newLocID
        }
        this.playerLoc = player.location;
        break;
      case "d":
        newLocID = chngLocID(worldSize, currentLoc, "horiz", 1);
        if(!this.state.world.wallLocs.includes(newLocID)){
          player.location = newLocID
        }
        this.playerLoc = player.location;
        break;
      case "f":
        console.log('farm');
        /**
         * @todo farming to worldUtils
         */
        // handle tree farming
        let treeLocs = this.state.world.trees.locs;
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
        // handle carrot farming
        let carrotLocs = this.state.world.carrots.locs;
        if(this.state.world.carrots[currentLoc]){
          let playerHasCarrots = false;
          player.inventory.forEach((item)=>{
            if (item.name === "carrot") { item.count++; playerHasCarrots = true;}
          });
          if (!playerHasCarrots) { player.inventory.push({name: "carrot", count: 1}) }
          this.state.world.carrots[currentLoc].supply--;
          if (this.state.world.carrots[currentLoc].supply === 0){
            delete this.state.world.carrots[currentLoc];
            carrotLocs.splice(treeLocs.indexOf(currentLoc),1);
          }
        }
        break;
      case "1":
        player.itemSelected = this.selectItem(keyPressed);
        this.setState({player});
        break;
      case "2":
        player.itemSelected = this.selectItem(keyPressed);
        this.setState({player});
        break;
      case "3":
        player.itemSelected = this.selectItem(keyPressed);
        this.setState({player});
        break;
      case "4":
        player.itemSelected = this.selectItem(keyPressed);
        this.setState({player});
        break;
      case "5":
        player.itemSelected = this.selectItem(keyPressed);
        this.setState({player});
        break;
      case "6":
        player.itemSelected = this.selectItem(keyPressed);
        this.setState({player});
        break;
      case "7":
        player.itemSelected = this.selectItem(keyPressed);
        this.setState({player});
        break;
      case "8":
        player.itemSelected = this.selectItem(keyPressed);
        this.setState({player});
        break;
      case "9":
        player.itemSelected = this.selectItem(keyPressed);
        this.setState({player});
        break;

      // Handle Using Items
      // and eventually check if block is empty

      case ' ':
        console.log('using item');
        // Handle carrot planting
        if (player.inventory[thisItemSelection].name === "carrot"){
          let carrots = {...this.state.world.carrots};
          carrots.locs.push(currentLoc);
          let newCarrot = {
            location: currentLoc, 
            supply: 3, 
            matureDay: this.state.world.dayCount + 3
          };
          this.state.world.carrots[currentLoc] = newCarrot;
          this.setState({carrots});
          console.log(carrots);
          player.inventory[thisItemSelection].count--;
          this.setState({player});
        }
        // Handle Wall Building
        if (player.inventory[thisItemSelection].name === "wall") {
          this.state.world.wallLocs.push(currentLoc);
          this.state.player.inventory[thisItemSelection]--;
        }
        break;
      // Handle Eating items
      case 'e':
        console.log('eating item ');
        if (player.inventory[thisItemSelection].name === "carrot"){
          if (player.health <10){ 
            player.health++; 
            player.inventory[thisItemSelection].count--;
            this.setState({player});
          }
        }
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
    console.log(this.state.player.health);
    if (this.state.player.health > 0){
      return (
        <div className="world" onKeyPress={this.handleKey} tabIndex="0" >
        <div id="header">
          <div id="playerHealth">Health: {this.state.player.health}</div>
          <div id="dayCount"><h4>Day: {this.state.world.dayCount}</h4></div>
        </div>
          <div className="world-rows">
            {this.these_rows}
          </div>
          <Inventory playerItems={this.state.player.inventory} itemSelected={this.state.player.itemSelected} />
          <Craft playerItems={this.state.player.inventory} craft={this.addCraftToInventory} />
        </div>

      );
    } else if (this.state.player.health === 0) {
      return (
        <div>You died :(</div>
      );
    }
  }
}

export default World;
