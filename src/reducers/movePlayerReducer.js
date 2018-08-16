import { MOVE_PLAYER } from '../actions/types';
import initialData from '../initialData';

export default function(state=initialData, action) {
	switch (action.type){
		case MOVE_PLAYER: 
			let player = state.player;
			player.location = action.payload;
			return state
		default:
			return state
    }
}