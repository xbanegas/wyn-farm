/**
 * clockTick ticks the moveCount, dayCount, decrements health.
 * @param {Object} world 
 * @param {Object} player 
 */
const clockTick = (world, player) => {
    world.moveCount++;
    console.log(world.moveCount, world.dayInterval);
    let moveCount = world.moveCount;
    if (moveCount === world.dayInterval){ 
        world.moveCount = 0;
        world.dayCount++;
    }
    if (moveCount%10===0) {
        player.health--;
    }
    return {world, player}
}

export {clockTick};