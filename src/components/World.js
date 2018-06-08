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
  return locArray.join("")
}

const chngLocID = (locID, type, inc) => {
  let newLoc;
  console.log(inc)
  if (type === "vert") {
    newLoc = locIDToArray(locID);
    newLoc[0] += inc;
    newLoc = locArrayToLocId(newLoc)
    return newLoc;
  } else if (type === "horiz"){
    console.log(locID);
    newLoc = locIDToArray(locID);
    newLoc[1] += inc;
    newLoc = locArrayToLocId(newLoc)
    return newLoc;
  }
};

class World extends Component {
  constructor(props){
    super(props);
    this.state = {
      world: {
        size: 51,
        grid:[]
      },
      player: {
          id: '298323',
          location: '2525',
          name: 'kidA',
          hunger: 0,
          health: 10
      }
    }

    this.makeWorldRows(this.state.world.size);
    this.movePlayer = this.movePlayer.bind(this);
  }
  componentDidUpdate(){
    // console.log("update");
    // console.log(this.state.player.location);
    this.makeWorldRows(this.state.world.size);
  }

  makeWorldRows(size){
    let world_rows = '0'.repeat(size).split("");
    // console.log(world_rows);
    world_rows = world_rows.map(()=>'0'.repeat(size).split(""));
    world_rows.forEach((row, i) => row.forEach((block, j)=>{
      world_rows[i][j] = { location: `${padNum(i)}` + `${padNum(j)}` }
    }));
    this.state.grid = world_rows;

    this.these_rows = [];
    world_rows.forEach((row, i)=>{
      this.these_rows.push(<Row key={i} styleName={`row row-${i}`} data={this.state} rowNum={padNum(i)} />);
    });
    // console.log(this.these_rows);
  }
  
  movePlayer(e){
    e.preventDefault();
    let player = {...this.state.player};
    let currentLoc = player.location;
    console.log(currentLoc);
    switch(e.key){
      case "w":
        player.location = chngLocID(currentLoc, "vert", -1);
        this.setState({player: player});
        break;
      case "a":
        player.location = chngLocID(currentLoc, "horiz", -1);
        this.setState({player: player});
        break;
      case "s":
        player.location = chngLocID(currentLoc, "vert", 1);
        this.setState({player: player});
        break;
      case "d":
        player.location = chngLocID(currentLoc, "horiz", 1);
        this.setState({player: player});
        break;
    }
    // console.log(currentLoc);
    
    
    
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
