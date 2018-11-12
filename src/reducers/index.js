import { combineReducers } from 'redux';
import worldReducer from './worldReducer';
import playerReducer from './playerReducer';


export default combineReducers({
    world: worldReducer,
    player: playerReducer
});