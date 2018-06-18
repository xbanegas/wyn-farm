import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';

import World from '../components/World';

configure({ adapter: new Adapter() });

let worldSize = 10;

test('world renders rows', ()=>{
    const wrapper = mount(<World />);
    expect(wrapper.find('.row').length).toBe(worldSize);
    // expect(wrapper.find('.player')).toBe(true);
});