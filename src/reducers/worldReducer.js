import { INIT_WORLD, MAKE_WORLD_ROWS, POPULATE_WORLD, SET_WORLD} from '../actions/types';
import playerReducer from './playerReducer'
import World from '../models/World'

export default function(state = new World(), action) {
    console.log(action);
    switch(action.type){
        case INIT_WORLD:
            if (state === null) return new World()
            console.log('initializing world')
            return state
        case POPULATE_WORLD:
            console.log('populating world');
            return {
                ...state,
                trees: action.payload.trees,
                carrots: action.payload.carrots
            }
        case SET_WORLD:
            return action.payload
        // case TICK:
        //     return
        default:
            console.log('world reducer defaulting...', action)
            return state;
    }
}