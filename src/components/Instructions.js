import React, { Component } from 'react';
import '../css/Instructions.css'


class Instructions extends Component {
    render(){
        return (
            <div id="instructionsModal">
                <ul>
                    <li>A minecraft inspired suvival game.</li>
                    <li>You start with 10 health.</li>
                    <li>Your health will decrease as you move.</li>
                    <li>You move around with WASD.</li>
                    <li>You can pick up objects by moving onto them and pressing F.</li>
                    <li>Select Items in your Inventory with it's number key.</li>
                    <li>Eat carrots you pick up by selecting them in your Inventory and pressing E.</li>
                    <li>You can place Inventory Items by selecting them and pressing Space.</li>
                    <li>Carrots you plant will spawn at the block in 3 days.</li>
                    <li>You can craft items like Walls by collecting enough wood and clicking the item to craft.</li>
                    <li>Avoid Creeps!</li>
                </ul>
            </div>
        );
    }
}

export default Instructions;