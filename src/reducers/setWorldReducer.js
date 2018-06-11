import { SET_WORLD } from '../actions/types';

const initialState = {
    world:{'helloo':'helooo?'},
    player:{}
};

export default function(state =initialState, action) {
    console.log(action.payload);
    switch(action.type){
        case SET_WORLD:
            console.log('setting world');
            let worldData = {
                ...state,
                world: action.payload.world,
                player: action.payload.player
            };
            console.log(worldData);
            return worldData;
        default: 
            console.log('defaulting...')
            return state;
    }
}