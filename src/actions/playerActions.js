import {
  INIT_PLAYER,
  MOVE_PLAYER,
  SET_HEALTH,
  SET_PLAYER
} from './types';

export const initPlayer = (locID) => ({
  type: INIT_PLAYER,
  payload: locID
})

export const movePlayer = (locID) => ({
  type: MOVE_PLAYER,
  payload: locID
});

export const setHealth = (delta_health) => ({
  type: SET_HEALTH,
  payload: delta_health
});

export const setPlayer = (player) => ({
  type: SET_PLAYER,
  payload: player
})