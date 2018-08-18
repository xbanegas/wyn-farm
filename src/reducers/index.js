import { combineReducers } from 'redux';
import setWorldReducer from './setWorldReducer';
import movePlayerReducer from './movePlayerReducer';


export default combineReducers({
    worldData: setWorldReducer,
    player: movePlayerReducer
});