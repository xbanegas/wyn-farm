import React, { Component } from 'react';
import Row from './Row';
import Block from './Block';
import logo from '../logo.svg';
import '../css/World.css';

const padNum = (num)=> {
  return String("0" + num).slice(-2);
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
    console.log("update");
    console.log(this.state.player.location);
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
    // console.log(this.state);
    let player = {...this.state.player};
    // console.log(player.location);
    player.location = String(Number(player.location) + 1);
    // console.log(player.location);
    this.setState({player: player});
    
  }

  render() {
    // console.log(this.state.player.location);
    return (
      <div className="world" onClick={this.movePlayer}>
        {this.these_rows}
      </div>
    );
  }
}

export{padNum};
export default World;
