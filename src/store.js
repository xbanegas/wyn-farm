import {createStore, applyMiddleware} from 'redux';
// import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import worldReducer from './reducers/worldReducer';
import playerReducer from './reducers/playerReducer';

const reducer = combineReducers({
  world: worldReducer,
  player: playerReducer
});

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;