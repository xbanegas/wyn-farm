import React, { Component } from 'react';
import Row from './Row';
import Block from './Block';
import logo from '../logo.svg';
import '../css/World.css';

const padNum = (num)=> {
  return String("0" + num).slice(-2);
};

const locIDToArray = (locID) => {
  return [Number(locID.slice(0,2)),Number(locID.slice(2))]
};

const locArrayToLocId = (locArray) => {
  locArray = locArray.map((coord) => padNum(coord));
  return locArray.join("")
}

class World extends Component {
  constructor(props){
    super(props);
    this.state = {
      world: {
        size: 5,
        grid:[]
      },
      player: {
          id: '298323',
          location: '0404',
          name: 'kidA',
          hunger: 0,
          health: 10
      }
    }

    this.makeWorldRows(this.state.world.size, this.state.player.location);
    this.movePlayer = this.movePlayer.bind(this);
  }
  componentDidUpdate(){
    console.log("world update");
    // console.log(this.state.player.location);
    // this.makeWorldRows(this.state.world.size, this.playerLoc, this.state.player);
  }

  chngLocID = (locID, type, inc) => {
    let newLoc;
    let dim;
    if (type === "vert"){dim = 0}
    else if (type === "horiz") {dim = 1}
    newLoc = locIDToArray(locID);
    newLoc[dim] = newLoc[dim] + parseInt(inc);
    console.log(newLoc);
    if (newLoc[dim] < 0 ) {newLoc[dim] = padNum(this.state.world.size-1)}
    else if (newLoc[dim]>this.state.world.size-1) { newLoc[dim] = padNum(0) }
    newLoc = locArrayToLocId(newLoc);
    console.log(newLoc);
    return newLoc;
  };

  makeWorldRows(size, playerLoc, player){
    let world_rows = '0'.repeat(size).split("");
    // console.log(world_rows);
    world_rows = world_rows.map(()=>'0'.repeat(size).split(""));
    world_rows.forEach((row, i) => row.forEach((block, j)=>{
      world_rows[i][j] = { location: `${padNum(i)}` + `${padNum(j)}` }
    }));
    this.state.grid = world_rows;

    this.these_rows = [];
    world_rows.forEach((row, i)=>{
      this.these_rows.push(<Row key={i} styleName={`row row-${i}`} data={this.state} playerLoc={playerLoc} rowNum={padNum(i)} />);
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
        player.location = this.chngLocID(currentLoc, "vert", -1);
        this.playerLoc = player.location;
        break;
      case "a":
        player.location = this.chngLocID(currentLoc, "horiz", -1);
        this.playerLoc = player.location;
        break;
      case "s":
        player.location = this.chngLocID(currentLoc, "vert", 1);
        this.playerLoc = player.location;
        break;
      case "d":
        player.location = this.chngLocID(currentLoc, "horiz", 1);
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
