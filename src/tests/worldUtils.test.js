import {locIDToArray, gaussGen} from "../utils/dataUtils";
import {genPlayerInitialLoc, chngLocID, locHasWall, moveRandomAdjacent, isAdjacent} from "../utils/worldUtils";

let worldSize = 5;
let gaussFunct = gaussGen(worldSize/2, worldSize/4);

test('a valid player location is generated', ()=>{
    let playerLoc = genPlayerInitialLoc(gaussFunct);
    expect(playerLoc.length).toBe(4);
    playerLoc = locIDToArray(playerLoc);
    expect(Number(playerLoc[0])).toBeLessThan(worldSize);
    expect(Number(playerLoc[1])).toBeLessThan(worldSize);
});

test('the player moves correctly', ()=>{
    let playerLoc = "0403";
    expect(chngLocID(worldSize, playerLoc, "vert", 1)).toBe("0003");
    expect(chngLocID(worldSize, playerLoc, "vert", -1)).toBe("0303");
    playerLoc = "0404";
    expect(chngLocID(worldSize, playerLoc, "horiz", 1)).toBe("0400");
    expect(chngLocID(worldSize, playerLoc, "horiz", -1)).toBe("0403");
    playerLoc = "0000";
    expect(chngLocID(worldSize, playerLoc, "horiz", -1)).toBe("0004");
    expect(chngLocID(worldSize,playerLoc,"vert", -1)).toBe("0400");
});

test('identifies adjacent blocks', ()=>{
    let worldSize = 5;
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
    let worldSize = 5;
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

});

test('generates random carrotLocs', ()=>{
    
});

test('generates random creepLocs', ()=>{
    
});