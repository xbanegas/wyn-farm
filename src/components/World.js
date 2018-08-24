import React, { Component } from 'react';
import Row from './Row';
import Inventory from './Inventory';
import Craft from './Craft';
import {padNum, makeGrid, gaussGen} from '../utils/dataUtils';
import { 
  genPlayerInitialLoc, chngLocID, genTreeLocs, 
  genCarrotLocs, genCreepLocs, isAdjacent, moveRandomAdjacent,
  locHasWall
} from '../utils/worldUtils';
// import logo from '../logo.svg';
import Instructions from './Instructions';
import initialData from '../initialData';
import '../css/World.css';
import {connect} from 'react-redux';
import {setWorld, movePlayer} from '../actions/setWorldActions';
import { SET_WORLD } from '../actions/types';
import { bindActionCreators } from 'redux';

class World extends Component {
  constructor(props){
    super(props);
    let worldSize = this.props.world.size - 1;
    this.gaussGen = gaussGen(worldSize/2, worldSize/4);
    this.props.player.location = genPlayerInitialLoc(this.props.world.size, this.gaussGen);
    this.props.world.trees = genTreeLocs(this.props.world.size, this.gaussGen, this.props.world.trees.total);
    this.props.world.carrots = genCarrotLocs(worldSize, this.gaussGen, this.props.world.carrots.total);
    this.makeWorldRows(this.props.player.location, this.props.player);
    this.handleKey = this.handleKey.bind(this);
    this.addCraftToInventory = this.addCraftToInventory.bind(this);
    this.props.setWorld(initialData);
  }

  componentWillMount(){
    console.log(this.props);
  }

  componentDidUpdate(){
    // console.log("world update");
    // this.props.setWorld();
  }


  makeWorldRows(playerLoc, player){
    this.grid = makeGrid(this.props.world.size);
    this.these_rows = [];
    let treeLocs = this.props.world.trees.locs;
    let trees = this.props.world.trees;
    let carrotLocs = this.props.world.carrots.locs;
    let carrots = this.props.world.carrots;
    let wallLocs = this.props.world.wallLocs;
    let creepLocs = this.props.world.creeps.locs;
    let creeps = this.props.world.creeps;
    this.grid.forEach((row, i)=>{
      this.these_rows.push(
        <Row 
          key={i} 
          styleName={`row row-${i}`} 
          worldSize={this.props.world.size} 
          dayCount={this.props.world.dayCount}
          playerLoc={playerLoc} 
          treeLocs={treeLocs}
          trees={trees}
          rowNum={padNum(i)}
          carrotLocs={carrotLocs}
          carrots={carrots}
          wallLocs={wallLocs}
          creepLocs={creepLocs}
          creeps={creeps}
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
    let world = {...this.props.world};
    let player = {...this.props.player};
    world.moveCount++;
    let moveCount = world.moveCount;
    if (!(moveCount < world.dayInterval)){ 
      world.moveCount = 0;
      world.dayCount++;
    }
    if (moveCount%10===0) {
      player.health--;
    }
    // creeps from move day after spawn
    if (world.dayCount > 3) {
      world.creeps.locs = world.creeps.locs.map((creepLoc)=>{
        return moveRandomAdjacent(this.props.world.size, creepLoc, this.props.world.wallLocs);
      });
      /**
       * @todo creeps cant move through walls 
       */
    }
    // this.setState({world: world});
		// this.setState({player: player});
		this.props.setWorld({world, player});
    // gen Creeps
    if (world.dayCount === 3){
      world = {...this.props.world};
      if (world.creeps.locs.length === 0) {
        world.creeps = genCreepLocs(this.gaussGen, this.props.world.creeps.total);
        this.setState({world});
      }
    }

    // Handle Keypresses
    let worldSize = this.props.world.size;
    let currentLoc = player.location;
    let keyPressed = e.key
    let thisItemSelection = this.props.player.itemSelected;
    let newLocID = "";
    let wallLocs = this.props.world.wallLocs;
    switch(keyPressed){
			case "w":
        newLocID = chngLocID(worldSize, currentLoc, "vert", -1);
				if(!locHasWall(newLocID, wallLocs)){ player.location = newLocID }
        this.props.movePlayer(newLocID);
        this.playerLoc = player.location;
        break;
      case "a":
        newLocID =  chngLocID(worldSize, currentLoc, "horiz", -1);
        if(!locHasWall(newLocID, wallLocs)){ player.location = newLocID }
        this.props.movePlayer(newLocID);
        this.playerLoc = player.location;
        break;
      case "s":
        newLocID = chngLocID(worldSize, currentLoc, "vert", 1);
        if(!locHasWall(newLocID, wallLocs)){ player.location = newLocID }
        this.props.movePlayer(newLocID);
        this.playerLoc = player.location;
        break;
      case "d":
        newLocID = chngLocID(worldSize, currentLoc, "horiz", 1);
        if(!locHasWall(newLocID, wallLocs)){ player.location = newLocID }
        this.props.movePlayer(newLocID);
        this.playerLoc = player.location;
        break;
      case "f":
        console.log('farm');
        /**
         * @todo farming to worldUtils
         */
        // handle tree farming
        let treeLocs = this.props.world.trees.locs;
        if(treeLocs.includes(currentLoc)){
          player.inventory.forEach((item)=>{
            if (item.name === "wood") { item.count++; }
          });
          if(world.trees[currentLoc]){ world.trees[currentLoc].supply-- };
          this.setState({world});
          if (this.props.world.trees[currentLoc] && this.props.world.trees[currentLoc].supply === 0){
            delete world.trees[currentLoc];
            treeLocs.splice(treeLocs.indexOf(currentLoc),1);
            this.setState({world});
          }
        }
        // handle carrot farming
        let carrotLocs = this.props.world.carrots.locs;
        if(this.props.world.carrots[currentLoc]){
          let playerHasCarrots = false;
          player.inventory.forEach((item)=>{
            if (item.name === "carrot") { item.count++; playerHasCarrots = true;}
          });
          if (!playerHasCarrots) { player.inventory.push({name: "carrot", count: 1}) }
          if(world.carrots[currentLoc]){world.carrots[currentLoc].supply--;}
          this.setState({world});
          if (this.props.world.carrots[currentLoc] && this.props.world.carrots[currentLoc].supply === 0){
            delete world.carrots[currentLoc];
            carrotLocs.splice(treeLocs.indexOf(currentLoc),1);
            this.setState({world});
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
        if (player.inventory[thisItemSelection].name === "carrot" 
        && player.inventory[thisItemSelection].count > 0){
          let carrots = {...this.props.world.carrots};
          carrots.locs.push(currentLoc);
          let newCarrot = {
            location: currentLoc, 
            supply: 3, 
            matureDay: this.props.world.dayCount + 3
          };
          this.props.world.carrots[currentLoc] = newCarrot;
          this.setState({carrots});
          player.inventory[thisItemSelection].count--;
          this.setState({player});
        }
        // Handle Wall Building
        if (player.inventory[thisItemSelection].name === "wall" 
        && player.inventory[thisItemSelection].count > 0) {
          this.props.world.wallLocs.push(currentLoc);
          player.inventory[thisItemSelection].count--;
          this.setState({player});
        }
        break;
      // Handle Eating items
      case 'e':
        console.log('eating item ');
        if (player.inventory[thisItemSelection].name === "carrot"){
          if (player.health <10 && player.inventory[thisItemSelection].count > 0){ 
            player.health++; 
            player.inventory[thisItemSelection].count--;
            this.setState({player});
          }
        }
      default: 
        break;
      }
    // if (isAdjacent(this.worldSize, this.playerLoc, this.props.world.trees.locs)){}
    this.props.world.creeps.locs.forEach(function(creepLocID){
      let isNextToCreep = isAdjacent(world.size, creepLocID, player.location);
      if(isNextToCreep){
        player.health--;
        this.setState({player});
      }
    }, this);
    this.makeWorldRows(this.playerLoc, player);
  }

  addCraftToInventory(item){
    // console.log(this.props);
    let player = {...this.props.player};
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

  instructionsModal(){
    this.props.world.instructions += 1;
    let instructions = {...this.props.world.instructions};
    instructions += 1
    this.setState({instructions});
  }

  addInstructionsModal(){
    return(
      <div id="instructionToggle">
        <div id="toggleButton"><button href="#" onClick={this.instructionsModal}>Instructions</button></div>
        <div style={this.props.world.instructionStyle[this.props.world.instructions % 2]}>
          <Instructions />
        </div>
      </div>
    );
  };

  render() {
    if (this.props.player.health > 0){
      return (
        <div className="world" onKeyPress={this.handleKey} tabIndex="0" >
          {this.addInstructionsModal()}
          <div id="header">
            <div id="dayCount">
              <h4>Day: {this.props.world.dayCount}</h4>
            </div>
            <div id="playerHealth">
              <h4>Health: </h4><div>{"*".repeat(this.props.player.health)}</div>
            </div>
          </div>
          <div className="world-rows">
            {this.these_rows}
          </div>
          <Inventory playerItems={this.props.player.inventory} itemSelected={this.props.player.itemSelected} />
          <Craft playerItems={this.props.player.inventory} craft={this.addCraftToInventory} />
          <div id="codeLink"><a href="https://github.com/xbanegas/wyn-farm">code</a></div>
        </div>
      );
    } else if (this.props.player.health === 0) {
      return (
        <div>You died on day {this.props.world.dayCount}</div>
      );
    }
  }
}

const mapStateToProps = state => ({
    world: state.worldData.world,
    player: state.worldData.player
});

const mapDispatchToProps = dispatch => {
	return {
		setWorld: (data) => dispatch(setWorld(data)),
		movePlayer: bindActionCreators(movePlayer, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(World);
