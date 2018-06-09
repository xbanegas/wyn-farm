import React, { Component } from 'react';
import containsPlayer from '../utils/worldUtils';
import '../css/Block.css'

class Block extends Component {
    constructor(props){
        super(props);
        this.location = props.blockID
        this.block_content = this.makeBlockContent(props);
    }
    componentDidUpdate(){
        console.log('block update');
        // console.log(this.props.type);
        this.block_content = this.makeBlockContent(this.props);
    }
    componentWillReceiveProps(newProps){
        console.log("newProps");
        this.block_content = this.makeBlockContent(newProps);
    }

    player(){
        return(
            <div className="player">
                <span>X</span>
            </div>
        );
    }

    makeBlockContent(props){
        // console.log(this.state.player.location);
        if (props.blockCode[0] === "x"){
            return(
                <div className={`block_content ${props.blockCode.slice(0)}`}>
                    {this.player()}
                </div>
            );
        } else {
            return(
                <div className={`block_content ${props.blockCode.slice(0)}`}>
                    <span></span>
                </div>
            );
        }
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