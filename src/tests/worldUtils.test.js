import {locIDToArray} from "../utils/dataUtils";
import {genPlayerInitialLoc, chngLocID, moveRandomAdjacent, isAdjacent} from "../utils/worldUtils";

test('a valid player location is generated', ()=>{
    let worldSize = 5
    let playerLoc = genPlayerInitialLoc(worldSize);
    expect(playerLoc.length).toBe(4);
    playerLoc = locIDToArray(playerLoc);
    expect(Number(playerLoc[0])).toBeLessThan(worldSize);
    expect(Number(playerLoc[1])).toBeLessThan(worldSize);
});

test('the player moves correctly', ()=>{
    let worldSize = 5;
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