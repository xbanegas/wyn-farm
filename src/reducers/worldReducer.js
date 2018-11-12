import { INIT_WORLD, POPULATE_WORLD, MOVE_DAYS, SET_WORLD} from '../actions/types';
import World from '../models/World'

export default function(world = new World(), action) {
    console.log(action);
    switch(action.type){
        case INIT_WORLD:
            if (world === null) return new World()
            console.log('initializing world')
            return world

        case POPULATE_WORLD:
            console.log('populating world');
            return {
                ...world,
                trees: action.payload.trees,
                carrots: action.payload.carrots
            }

        case MOVE_DAYS:
            let next_world = {...world}
            next_world.moveCount++;
            let moveCount = next_world.moveCount;
            if (!(moveCount < next_world.dayInterval)){
              next_world.moveCount = 0;
              next_world.dayCount++;
            }
            console.log(next_world)
            return next_world

        case SET_WORLD:
            return {...action.payload}

        default:
            console.log('world reducer defaulting...', action)
            return {...world};
    }
}