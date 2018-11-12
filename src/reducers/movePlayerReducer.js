import { MOVE_PLAYER } from '../actions/types';
import initialData from '../initialData';

export default function(state=initialData, action) {
	switch (action.type){
		case MOVE_PLAYER:
			let next_state = {...state}
			let player = next_state.player;
			player.location = action.payload;
			return next_state
		default:
			return state
    }
}