import { INIT_WORLD, POPULATE_WORLD, SET_WORLD, MOVE_DAYS } from './types';
import World from '../models/World'

export const initWorld = () => ({
    type: INIT_WORLD,
    payload: null
})

export const populateWorld = (trees, carrots) => ({
    type: POPULATE_WORLD,
    payload: {trees, carrots}
})

export const moveDays = () => ({
    type: MOVE_DAYS,
})

export const setWorld = (world) => ({
    type: SET_WORLD,
    payload: world
})