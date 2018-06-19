import {moveRandomAdjacent} from './worldUtils';

/**
 * clockTick ticks the moveCount, dayCount, decrements health.
 * @param {Object} world 
 * @param {Object} player 
 */
const clockTick = (world, player) => {
    world.moveCount++;
    let moveCount = world.moveCount;
    if (moveCount === world.dayInterval){ 
        world.moveCount = 0;
        world.dayCount++;
    }
    if (moveCount%world.healthDecayRate===0) {
        player.health--;
    }
    return {world, player}
}

/**
 * genNewGreepLocs
 * @param {Object} world 
 */
const genNewCreepLocs = (world) => {
    return world.creeps.locs.map((creepLoc)=>{
        return moveRandomAdjacent(world.size, creepLoc, world.wallLocs);
    });
}

export {clockTick, genNewCreepLocs};