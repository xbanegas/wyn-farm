import { SET_WORLD } from '../actions/types';
import initialData from '../initialData';


export default function(state =initialData, action) {
    console.log(action);
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