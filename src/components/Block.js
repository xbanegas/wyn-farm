import React, { Component } from 'react';
// import containsPlayer from '../utils/worldUtils';
import {connect} from 'react-redux'
import '../css/Block.css'

class Block extends Component {
    constructor(props){
        super(props);
        this.location = props.blockID
        this.state = {content_class: ""}
    }

    makeBlockContent(){
        let blockContent = []
        // Render Tree
        if (this.props.world.trees.locs.includes(this.props.blockID)){
            blockContent.push(
                <div key={3} className="block_content tree">TREE</div>
            );
        // Render Carrot
        } else if (
            (this.props.world.carrots[this.props.blockID]) &&
            (this.props.world.dayCount >= this.props.world.carrots[this.props.blockID].matureDay )) {
            blockContent.push(
                <div key={4} className="block_content carrot">CARROT</div>
            );
        // Render Wall
        } else if (this.props.world.wallLocs.includes(this.props.blockID)) {
            blockContent.push(
                <div key={5} className="block_content wall">WALL</div>
            );
        // Render Creep
        } else if (this.props.world.creeps.locs.includes(this.props.blockID)) {
            blockContent.push(
                <div key={6} className="block_content creep">CREEP!</div>
            );
        // Else Render Grass
        } else {
            blockContent.push(
                <div key={0} className={`block_content grass`}>
                    <span></span>
                </div>
            );
        }
        // Render Player
        if (this.props.blockID === this.props.player.location){
            blockContent.push(
                // <div className={`block-content ${props.blockCode[1]}`}>
                <div key="x" className="block-content">
                    <div className="player"> </div>
                </div>
            );
        }
        return blockContent;
    }

    render(){
        return(
            <div className="block" id={this.location}>
                <div style={{color: '#000'}}>{this.location}</div>
                {this.makeBlockContent()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    world: state.world,
    player: state.player
});

export default connect(mapStateToProps)(Block)