import React, { Component } from 'react';
import '../css/Inventory.css';

class Inventory extends Component {
    constructor(props){
        super(props);
        this.renderItemDivs();
    }

    renderItemDivs(){
        let item_divs = [];
        // console.log(this.props.playerItems);
        let items = this.props.playerItems;
        for (let item in items){
            item_divs.push(
                <div key={item} className="item">
                    {item}: {items[item]}
                </div>
                );
        }
        return item_divs
    }
    render(){
        return(
            <div id="inventory">
                <h4>Inventory</h4>
                {this.renderItemDivs()}
            </div>
        );
    }
}

export default Inventory;