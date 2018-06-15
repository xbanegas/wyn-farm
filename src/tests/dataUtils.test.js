import {padNum, locIDToArray, locArrayToLocId, makeGrid, mod} from '../utils/dataUtils';

test('padNum pads single digit numbers to two', ()=>{
    expect(padNum(0)).toBe("00");
    expect(padNum(10)).toBe("10");
    expect(padNum(4)).toBe("04");
});

test('locIDToArray converts 4digit string of nums to array of 2 nums', ()=>{
    let locID = "0400"
    let locArray = locIDToArray(locID);
    expect(locArray).toBeInstanceOf(Array);
    expect(locArray[0]).toBe(4);
    expect(locArray[1]).toBe(0);
});

test('locArrayToLocId converts array of 2 nums to string of 4 nums', ()=>{
    let locArray = [4, 0];
    let locID = locArrayToLocId(locArray);
    expect(locID).toBe("0400");
});

test('makeGrid should make 2d grid with block objects', ()=>{
    let worldSize = 5;
    let grid = makeGrid(5);
    expect(grid.length).toBe(worldSize);
    grid.forEach((row, i)=>{
        expect(row.length).toBe(5);
        row.forEach((block, j)=>{
            expect(block.location).toBe(`${padNum(i)}-${padNum(j)}`);
        });
    });
});

test('mod returns non-negative mods', ()=>{
    expect(mod(0,5)).toBe(0);
    expect(mod(5,5)).toBe(0);
    expect(mod(-1,5)).toBe(4);
    expect(mod(-5,5)).toBe(0);
});

