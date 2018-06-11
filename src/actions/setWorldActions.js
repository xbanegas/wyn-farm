import { SET_WORLD } from './types';
import initialData from '../initialData';

let worldData = initialData;

export const setWorld = () => ({
    type: SET_WORLD,
    payload: worldData
})
