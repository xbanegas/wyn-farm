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
        let itemSelectedClass = "";
        let itemSelected = this.props.itemSelected;
        for (let [i, item] of items.entries()){
            itemSelectedClass = itemSelected === i ? "selected" : "";
            item_divs.push(
                <div key={item.name} className={`item ${itemSelectedClass}`}>
                    <div className="item-name"><h6>{item.name}</h6></div>
                    <div className="item-count">{item.count}</div>
                </div>
            );
        }
        return item_divs
    }
    render(){
        return(
            <div id="inventory">
                <h4 id="inventoryTitle">Inventory</h4>
                <div id="playerItems">
                    {this.renderItemDivs()}
                </div>
            </div>
        );
    }
}

export default Inventory;