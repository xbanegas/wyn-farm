import {gaussGen} from "../utils/dataUtils";
import {genPlayerInitialLoc, chngLocID, locHasWall, locIsOnMap, moveRandomAdjacent, 
    isAdjacent, genTreeLocs, genCarrotLocs, genCreepLocs} from "../utils/worldUtils";

let worldSize = 10;
let gaussFunct = gaussGen(worldSize/2, worldSize/4);

test('a valid player location is generated', ()=>{
    let numOfTests = 20;
    let playerLoc;
    for(let i=0; i<numOfTests; i++){
        playerLoc = genPlayerInitialLoc(worldSize, gaussFunct);
        expect(playerLoc.length).toBe(4);
        expect(locIsOnMap(worldSize, playerLoc)).toBe(true);
    }
});

test('location is on map', () =>{
    let locID = "0909";
    expect(locIsOnMap(worldSize, locID)).toBe(true);
    locID = "1100";
    expect(locIsOnMap(worldSize, locID)).toBe(false);
});

test('the player moves correctly', ()=>{
    let playerLoc = "0403";
    expect(chngLocID(worldSize, playerLoc, "vert", 1)).toBe("0503");
    expect(chngLocID(worldSize, playerLoc, "vert", -1)).toBe("0303");
    playerLoc = "0404";
    expect(chngLocID(worldSize, playerLoc, "horiz", 1)).toBe("0405");
    expect(chngLocID(worldSize, playerLoc, "horiz", -1)).toBe("0403");
    playerLoc = "0000";
    expect(chngLocID(worldSize, playerLoc, "horiz", -1)).toBe("0009");
    expect(chngLocID(worldSize,playerLoc,"vert", -1)).toBe("0900");
});

test('identifies adjacent blocks', ()=>{
    let playerLoc = "0403";
    let creepLoc = "0303";
    expect(isAdjacent(worldSize,playerLoc,creepLoc)).toBe(true);
});

test('checks for wallLocIDs', ()=>{
    let locID = "0400";
    let wallLocs = ["0000", "0300"];
    expect(locHasWall(locID, wallLocs)).toBe(false);
    wallLocs.push("0400");
    expect(locHasWall(locID, wallLocs)).toBe(true);
});

test('changes locID to a random adjacent locID avoiding walls', ()=>{
    let creepLoc = "0303";
    let wallLocs = ["0000", "0302"];
    let adjacentBlocks = ["0403", "0203", "0304", "0302"];
    
    let numOfTests = 20;
    let newLoc;
    for(let i=0; i<numOfTests; i++){
        newLoc = moveRandomAdjacent(worldSize, creepLoc, wallLocs);
        expect(adjacentBlocks.includes(newLoc)).toBe(true);
        expect(newLoc).not.toBe("0302")
    }
});

test('generates random treeLocs', ()=>{
    let trees = genTreeLocs(worldSize, gaussFunct, 10);
    expect(trees.locs.length).toBe(10);
    trees = Object.entries(trees).filter((item)=> {return item[0] != 'locs'});
    trees.forEach((tree)=>{
        tree = tree[1];
        let onMap = locIsOnMap(worldSize, tree.location);
        expect(onMap).toBe(true);
        expect(tree.supply).toBe(10);
    });
});

test('generates random carrotLocs', ()=>{
    let carrots = genCarrotLocs(worldSize, gaussFunct, 3);
    expect(carrots.locs.length).toBe(3);
    carrots = Object.entries(carrots).filter((item)=>{return item[0] != 'locs'});
    carrots.forEach((carrot)=>{
        carrot = carrot[1];
        let onMap = locIsOnMap(worldSize, carrot.location);
        expect(onMap).toBe(true);
        expect(carrot.supply).toBe(3);
    });
});

test('generates random creepLocs', ()=>{
    let creeps = genCreepLocs(worldSize, gaussFunct, 3);
    expect(creeps.locs.length).toBe(3);
    creeps = Object.entries(creeps).filter((item)=>{return item[0] != 'locs'});
    creeps.forEach((creep)=>{
        creep = creep[1];
        let onMap = locIsOnMap(worldSize, creep.location);
        expect(onMap).toBe(true);
        expect(creep.health).toBe(5);
    });
});