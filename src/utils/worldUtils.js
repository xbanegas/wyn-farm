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
    treeLocs.forEach((treeLoc)=>{
        trees[treeLoc] = {location: treeLoc, supply: 10};
    });
    return trees
};


export {chngLocID, containsPlayer, genPlayerInitialLoc, genTreeLocs};