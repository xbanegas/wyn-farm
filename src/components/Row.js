import React, { Component } from 'react';
import {padNum} from '../utils/dataUtils';
import Block from './Block';
import '../css/Row.css';

class Row extends Component {
    constructor(props){
        super(props);
        this.makeRows(props);

    }
    componentDidUpdate(){
        // console.log("rowupdate");
    }
    componentWillReceiveProps(newProps){
        this.makeRows(newProps);
    }
    makeRows(props){
        let size = props.worldSize;
        this.these_blocks = []
        for (let i = 0; i< size; i++){
            let blockID = `${this.props.rowNum}${padNum(i)}`;
            // default to grass block
            let blockCode = ["z","00"];
            // register player block
            if(blockID === props.playerLoc) {blockCode[0] = "x"}
            // register tree block
            if(props.treeLocs.includes(blockID)){
                blockCode[1] = "33";
            }
            // register carrot block
            if(props.carrotLocs.includes(blockID)){ blockCode[1] = "44" }
            this.these_blocks.push(<Block key={blockID} blockCode={blockCode} blockID={blockID}/>);
        }
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
