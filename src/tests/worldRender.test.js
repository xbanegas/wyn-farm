import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';

import World from '../components/World';

configure({ adapter: new Adapter() });

let worldSize = 10;
let treeTotalMin = 6;
let carrotTotalMin = 2;

const wrapper = mount(<World onKeyPress={World.handleKey}/>);

const playerBlockIDHelper = (playerParents) => {
    let playerLoc = ""
    playerParents.forEach((parent)=>{
        if(parent.props().className === 'block'){
            playerLoc = parent.props().id;
        }
    });
    return playerLoc
}

test('world renders correct intial state', ()=>{
    expect(wrapper.find('.row').length).toBe(worldSize);
    expect(wrapper.find('.block').length).toBe(worldSize * worldSize);
    expect(wrapper.find('.tree').length).toBeGreaterThanOrEqual(treeTotalMin);
    expect(wrapper.find('.carrot').length).toBeGreaterThanOrEqual(carrotTotalMin);
    expect(wrapper.find('.player').length).toBe(1);
});

test('player moves correctly', ()=>{
    // wrapper.simulate('click');
    // let spy = jest.spyOn(World.prototype, 'componentDidMount');
    // console.log(spy);
    // let playerParents = wrapper.find('.player').parents();
    // let playerLoc = playerBlockIDHelper(playerParents);
    // wrapper.simulate('keyDown', {keyCode: 87});
    // expect(spy).toHaveBeenCalled();
    // playerParents = wrapper.find('.player').parents();
    // let newPlayerLoc = playerBlockIDHelper(playerParents);
    // console.log(playerLoc, newPlayerLoc);
});