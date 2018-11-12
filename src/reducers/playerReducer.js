import { INIT_PLAYER, MOVE_PLAYER, SET_HEALTH, SET_PLAYER } from '../actions/types';
import Player from '../models/Player'

export default function(player = new Player(), action) {
	switch (action.type){
		case INIT_PLAYER:
			return {
				...player,
				location: action.payload
			}
		case MOVE_PLAYER:
			return {
				...player,
				location: action.payload
			}
		case SET_HEALTH:
			let current_health = player.health
			return {
				...player,
				health: current_health + action.payload
			}
		case SET_PLAYER:
			return action.payload
		default:
			console.log('player reducer defaulting', action)
			return player
    }
}