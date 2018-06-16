import { SET_WORLD, MOVE_PLAYER } from './types';

export const setWorld = (worldData) => ({
    type: SET_WORLD,
    payload: worldData
})

export const movePlayer = (locID) => ({
    type: MOVE_PLAYER,
    payload: locID
});
