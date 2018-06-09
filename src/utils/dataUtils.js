const padNum = (num)=> {
    return String("0" + num).slice(-2);
};

const locIDToArray = (locID) => {
    return [Number(locID.slice(0,2)),Number(locID.slice(2))]
};

const locArrayToLocId = (locArray) => {
    locArray = locArray.map((coord) => padNum(coord));
    return locArray.join("")
}

const makeGrid = (size) => {
    let grid = Array(5).fill(Array(5).fill({}));
    grid = grid.map((row, i)=>{
      row = row.map((block, j)=>{
          block = {location:  `${padNum(i)}-${padNum(j)}`};
          return block
      });
      return row
    });
    return grid
}

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
    // console.log(newLoc);
    return newLoc;
  };

export {padNum, locIDToArray, locArrayToLocId, makeGrid, chngLocID}