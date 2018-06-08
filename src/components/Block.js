import React, { Component } from 'react';
import '../css/Block.css'

class Block extends Component {
    constructor(props){
        super(props);
        this.state = props.data;
        this.location = props.blockID
        this.block_content = this.makeBlockContent();
    }

    makeBlockContent(){
        if (this.state.player.location === this.props.blockID){
            return(
                <div className="block_content">
                    <span>X</span>
                </div>
            );
        } 
        return(
            <div className="block_content">
                <span>_</span>
            </div>
        );
    }

    render(){
        return(
            <div className="block" id={this.location}>
                {this.block_content}
            </div>
        );
    }
}
export default Block;