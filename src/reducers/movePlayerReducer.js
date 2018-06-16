import { MOVE_PLAYER } from '../actions/types';
import initialData from '../initialData';

export default function(state=initialData, action) {
    switch (action.type){
        case MOVE_PLAYER: 
            let player = state.player;
            console.log('previous pos ', player.location);
            player.location = action.payload;
            console.log('newloc', player.location);
            return state
            // console.log(action.payload);
        default:
            return state
    }
}