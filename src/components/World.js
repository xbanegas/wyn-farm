import React, { Component } from 'react';
import Row from './Row';
import {padNum, locIDToArray, locArrayToLocId, makeGrid, chngLocID} from '../utils/dataUtils';
import logo from '../logo.svg';
import initialData from '../initialData';
import '../css/World.css';


class World extends Component {
  constructor(props){
    super(props);
    this.state = initialData

    this.makeWorldRows(this.state.world.size, this.state.player.location);
    this.movePlayer = this.movePlayer.bind(this);
  }
  componentDidUpdate(){
    console.log("world update");
  }

  makeWorldRows(size, playerLoc, player){
    this.state.grid = makeGrid(this.state.world.size);
    this.these_rows = [];
    this.state.grid.forEach((row, i)=>{
      this.these_rows.push(<Row key={i} styleName={`row row-${i}`} worldSize={this.state.world.size} playerLoc={playerLoc} rowNum={padNum(i)} />);
    });
    this.setState({player: player});
    // console.log(this.these_rows);
  }
  
  movePlayer(e){
    e.preventDefault();
    let player = {...this.state.player};
    let currentLoc = player.location;
    // console.log(currentLoc);
    switch(e.key){
      case "w":
        player.location = chngLocID(this.state.world.size, currentLoc, "vert", -1);
        this.playerLoc = player.location;
        break;
      case "a":
        player.location = chngLocID(this.state.world.size, currentLoc, "horiz", -1);
        this.playerLoc = player.location;
        break;
      case "s":
        player.location = chngLocID(this.state.world.size, currentLoc, "vert", 1);
        this.playerLoc = player.location;
        break;
      case "d":
        player.location = chngLocID(this.state.world.size, currentLoc, "horiz", 1);
        this.playerLoc = player.location;
        break;
      }
    this.makeWorldRows(this.state.world.size, this.playerLoc, player);
    console.log(this.playerLoc);
  }

  render() {
    // console.log(this.state.player.location);
    return (
      <div className="world" onKeyPress={this.movePlayer} tabIndex="0" >
        {this.these_rows}
      </div>
    );
  }
}

export{padNum};
export default World;
