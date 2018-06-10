import React, { Component } from 'react';
import '../css/Inventory.css';

class Inventory extends Component {
    constructor(props){
        super(props);
        this.renderItemDivs();
    }

    renderItemDivs(){
        let item_divs = [];
        let items = this.props.playerItems;
        for (let item of items){
            item_divs.push(
                <div key={item.name} className="item">
                    <div class="item-name"><h6>{item.name}</h6></div>
                    <div class="item-count">{item.count}</div>
                </div>
                );
        }
        return item_divs
    }
    render(){
        return(
            <div id="inventory">
                <h4 id="inventoryTitle">Inventory</h4>
                {this.renderItemDivs()}
            </div>
        );
    }
}

export default Inventory;