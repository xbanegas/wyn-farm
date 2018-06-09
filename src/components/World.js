import React, { Component } from 'react';
import Row from './Row';
import {padNum, makeGrid} from '../utils/dataUtils';
import {genPlayerInitialLoc, chngLocID, genTreeLocs} from '../utils/worldUtils';
import logo from '../logo.svg';
import initialData from '../initialData';
import '../css/World.css';


class World extends Component {
  constructor(props){
    super(props);
    this.state = initialData;
    this.state.player.location = genPlayerInitialLoc(this.state.world.size);
    // console.log(this.state.player.location);
    this.state.world.trees.locs = genTreeLocs(this.state.world.size, this.state.world.trees.total);
    this.makeWorldRows(this.state.player.location, this.state.player);
    this.movePlayer = this.movePlayer.bind(this);
  }
  componentDidUpdate(){
    // console.log("world update");
  }

  makeWorldRows(playerLoc, player){
    this.state.grid = makeGrid(this.state.world.size);
    this.these_rows = [];
    let treeLocs = this.state.world.trees.locs;
    console.log(treeLocs);
    this.state.grid.forEach((row, i)=>{
      this.these_rows.push(
        <Row 
          key={i} 
          styleName={`row row-${i}`} 
          worldSize={this.state.world.size} 
          playerLoc={playerLoc} 
          treeLocs={treeLocs}
          rowNum={padNum(i)} />
      );
    });
    this.setState({player: player});
  }
  
  movePlayer(e){
    e.preventDefault();
    let worldSize = this.state.world.size
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
      }
    this.makeWorldRows(this.playerLoc, player);
  }

  render() {
    return (
      <div className="world" onKeyPress={this.movePlayer} tabIndex="0" >
        {this.these_rows}
      </div>
    );
  }
}

export{padNum};
export default World;
