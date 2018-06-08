import React, { Component } from 'react';
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
    makeBlockContent(props){
        // console.log(this.state.player.location);
        if (props.type === "player"){
            return(
                <div className="block_content">
                    <span>X</span>
                </div>
            );
        } else {
            return(
                <div className="block_content">
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