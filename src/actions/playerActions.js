import {INIT_PLAYER, MOVE_PLAYER, SET_PLAYER} from './types';
import Player from '../models/Player'

export const initPlayer = (locID) => ({
  type: INIT_PLAYER,
  payload: locID
})

export const movePlayer = (locID) => ({
  type: MOVE_PLAYER,
  payload: locID
});

export const setPlayer = (player) => ({
  type: SET_PLAYER,
  payload: player
})