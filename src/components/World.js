import React, { Component } from 'react';
import Row from './Row';
import Block from './Block';
import logo from '../logo.svg';
import '../css/World.css';

class World extends Component {
  constructor(props){
    super(props);
    this.state = {
      world: {
        size: 50,
        grid:[]
      },
      players: [
        {
          id: '298323',
          name: 'kidA',
          hunger: 0,
          health: 10
        }
      ]
    }

    this.makeWorldRows(this.state.world.size);
  }

  makeWorldRows(size){
    let world_rows = '0'.repeat(size).split("");
    // console.log(world_rows);
    world_rows = world_rows.map(()=>'0'.repeat(size).split(""));
    world_rows.forEach((row, i) => row.forEach((block, j)=>{
      world_rows[i][j] = { location: `${i}-${j}` }
    }));
    this.state.grid = world_rows;

    this.these_rows = [];
    world_rows.forEach((row, i)=>{
      this.these_rows.push(<Row key={i} styleName={`row row-${i}`} data={this.state.world} />);
    });
    console.log(this.these_rows);
  }

  render() {
    return (
      <div className="world">
        {this.these_rows}
      </div>
    );
  }
}

export default World;
