import React, { Component } from 'react';
import {padNum} from './World';
import Block from './Block';
import '../css/Row.css';

class Row extends Component {
    constructor(props){
        super(props);
        this.makeRows(props);

    }
    componentDidUpdate(){
        console.log("rowupdate");
        // this.makeRows(this.props);
    }
    componentWillReceiveProps(newProps){
        // console.log(newProps);
        this.makeRows(newProps);
    }
    makeRows(props){
        // console.log(props);
        let size = props.worldSize;
        this.these_blocks = []
        for (let i = 0; i< size; i++){
            if(props.rowNum+padNum(i) === props.playerLoc) {
                this.these_blocks.push(
                    <Block 
                        blockCode={`x00`} 
                        blockID={`${this.props.rowNum}` + `${padNum(i)}`}
                    />
                );
            } else {
            this.these_blocks.push(<Block blockCode="z00" blockID={`${this.props.rowNum}` + `${padNum(i)}`}/>);
            }
        }
        // console.log(this.these_blocks);
    }
    render(){
        return(
            <div className={this.props.styleName}>
                {this.these_blocks}
            </div>
        );
    }
}

export default Row;

// row.forEach((block, j) =>{
//     <Block className={block.location} />
//   });