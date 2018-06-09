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
        // console.log("rowupdate");
    }
    componentWillReceiveProps(newProps){
        this.makeRows(newProps);
    }
    makeRows(props){
        let size = props.worldSize;
        this.these_blocks = []
        for (let i = 0; i< size; i++){
            let blockID = `${this.props.rowNum}` + `${padNum(i)}`;
            let blockCode = ["z","00"];
            // console.log(blockID, props.playerLoc);
            if(blockID === props.playerLoc) {blockCode[0] = "x"}
            console.log(props.treeLocs);
            if(props.treeLocs.includes(blockID)){blockCode[1] = "33"}
            this.these_blocks.push(<Block blockCode={blockCode} blockID={blockID}/>);
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
