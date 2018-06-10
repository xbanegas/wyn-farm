import React, { Component } from 'react';


class Craft extends Component {
    renderCraftable(){
        let craftables = []
        let woodCount = 0;
        this.props.playerItems.forEach((item)=>{
            if(item.name === "wood"){ woodCount = item.count }
        });
        let craftableAxes = Math.floor(woodCount / 5);
        if (craftableAxes > 0){
            craftables.push(
                <div class="craftable" onClick={() => {
                    let item = {name: "Wooden Pickaxe", remove: {name: "wood", count: 5}};
                    this.props.craft(item)
                    }}>
                    <h6>Wooden Picaxe</h6>
                    <div>{craftableAxes}</div>
                </div>
            );
        }
        return craftables
    }

    render(){
        return(
            <div id="craft">
                <h4>Crafting</h4>
                {this.renderCraftable()}
            </div>
        );
    }
}

export default Craft;