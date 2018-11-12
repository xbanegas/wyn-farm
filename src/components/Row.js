import React, { Component } from 'react';
import {connect} from 'react-redux';
import {padNum} from '../utils/dataUtils';
import Block from './Block';
import '../css/Row.css';

class Row extends Component {
    constructor(props){
        super(props);
        this.makeRows(props);
    }

    makeRows(){
        let size = this.props.world.size;
        this.these_blocks = []
        for (let i = 0; i< size; i++){
            let blockID = `${this.props.rowNum}${padNum(i)}`;
            this.these_blocks.push(<Block key={blockID} blockID={blockID}/>);
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


const mapStateToProps = state => ({
    world: state.world,
    player: state.player
});

export default connect(mapStateToProps)(Row)
