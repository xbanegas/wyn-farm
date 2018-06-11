import { combineReducers } from 'redux';
import setWorldReducer from './setWorldReducer';

export default combineReducers({
    worldData: setWorldReducer
});