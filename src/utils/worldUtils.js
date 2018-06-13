import {padNum, locIDToArray, locArrayToLocId, genGauss} from './dataUtils';

const chngLocID = (worldSize, locID, type, inc) => {
    let newLoc;
    let dim;
    if (type === "vert"){dim = 0}
    else if (type === "horiz") {dim = 1}
    newLoc = locIDToArray(locID);
    newLoc[dim] = newLoc[dim] + parseInt(inc);
    if (newLoc[dim] < 0 ) {newLoc[dim] = padNum(worldSize-1)}
    else if (newLoc[dim]>worldSize-1) { newLoc[dim] = padNum(0) }
    newLoc = locArrayToLocId(newLoc);
    return newLoc;
};

const isAdjacent = (worldSize, locA, locB) => {
    let up = chngLocID(worldSize, locA, "vert", 1);
    let down = chngLocID(worldSize, locA, "vert", -1);
    let right = chngLocID(worldSize, locA, "horiz", 1);
    let left = chngLocID(worldSize, locA, "horiz", -1);
    if (locB === up || locB === down || locB === right || locB === left){
        return true;
    }
    return false;
}

const locHasWall = (locID, wallLocs) => {
    return wallLocs.includes(locID) ? true : false
}

const moveRandomAdjacent = (worldSize, locID, wallLocs) => {
    let directions = [["vert", 1], ["vert", -1], ["horiz", 1], ["horiz", -1]];
    let newLoc = "";
    do {
        let choice = Math.floor(Math.random()*4);
        newLoc = chngLocID(worldSize, locID, directions[choice][0], directions[choice][1]);
    } while(locHasWall(newLoc, wallLocs))
    return newLoc
}

const containsPlayer = (blockCode) => {
    try{
        if (blockCode[0] === 'x') {return true}
        else if (blockCode[0] === 'z') { return false}
    } catch(e){
        console.log('bad blockCode' + e);
        return 'bad blockCode';
    }
}

const genPlayerInitialLoc = (worldSize) => {
    let halfSize = (worldSize-1) / 2;
    let gaussGen = genGauss(halfSize, halfSize/2);
    let x = Math.floor(gaussGen());
    let y = Math.floor(gaussGen());
    return `${padNum(x)}${padNum(y)}`
};

/**
 * TreeLoc generation may be different in future
 * @param {*} worldSize 
 */
const genTreeLocs = (worldSize, total) => {
    let halfSize = (worldSize -1) / 2;
    let gaussGen = genGauss(halfSize, halfSize/2);
    let treeLocs = []
    for (let i = 0; i <= total; i++) {
        let x = Math.floor(gaussGen());
        let y = Math.floor(gaussGen());
        treeLocs.push(`${padNum(x)}${padNum(y)}`)
    }
    let trees = {locs: treeLocs}
    // eventually set inital supply in json
    treeLocs.forEach((treeLoc)=>{
        trees[treeLoc] = {location: treeLoc, supply: 10};
    });
    return trees
};

const genCarrotLocs = (worldSize, total) => {
    let halfSize = (worldSize -1) / 2;
    let gaussGen = genGauss(halfSize, halfSize/2);
    let carrotLocs = [];
    for (let i = 0; i < total; i++) {
        let x = Math.floor(gaussGen());
        let y = Math.floor(gaussGen());
        carrotLocs.push(`${padNum(x)}${padNum(y)}`)
    }
    let carrots = {locs: carrotLocs};
    carrotLocs.forEach((carrotLoc)=>{
        carrots[carrotLoc] = {location: carrotLoc, supply: 3, matureDay: 0};
    });
    return carrots
}

const genCreepLocs = (worldSize, total) => {
    let halfSize = (worldSize -1) / 2;
    let gaussGen = genGauss(halfSize, halfSize/2);
    let creepLocs = [];
    for (let i = 0; i < total; i++) {
        let x = Math.floor(gaussGen());
        let y = Math.floor(gaussGen());
        creepLocs.push(`${padNum(x)}${padNum(y)}`)
    }
    let creeps = {locs: creepLocs};
    creepLocs.forEach((creepLoc)=>{
        creeps[creepLocs] = {location: creepLoc, health: 5};
    });
    return creeps
}


export {
    chngLocID, containsPlayer, genPlayerInitialLoc, 
    genTreeLocs, genCarrotLocs, genCreepLocs, isAdjacent,
    moveRandomAdjacent
};