import React, { Component } from 'react';
import '../css/Block.css'

class Block extends Component {
    constructor(props){
        super(props);
        this.location = props.blockID
        this.block_content = this.makeBlockContent();
    }
    componentDidUpdate(){
        // console.log(this.props.type);
        this.block_content = this.makeBlockContent();
    }
    makeBlockContent(){
        // console.log(this.state.player.location);
        if (this.props.type === "player"){
            return(
                <div className="block_content">
                    <span>X</span>
                </div>
            );
        } 
        return(
            <div className="block_content">
                <span></span>
            </div>
        );
    }

    render(){
        return(
            <div className="block" id={this.location}>
                {this.location}
                {this.block_content}
            </div>
        );
    }
}
export default Block;