import {padNum, locIDToArray, locArrayToLocId, makeGrid, genGauss, mod} from '../utils/dataUtils';

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
