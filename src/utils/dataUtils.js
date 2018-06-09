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
    let grid = Array(size).fill(Array(size).fill({}));
    grid = grid.map((row, i)=>{
      row = row.map((block, j)=>{
          block = {location:  `${padNum(i)}-${padNum(j)}`};
          return block
      });
      return row
    });
    return grid
}


const genGauss = (mean, stdev) => {
    var y2;
    var use_last = false;
    return function() {
        var y1;
        if(use_last) {
            y1 = y2;
            use_last = false;
        }
        else {
            var x1, x2, w;
            do {
                    x1 = 2.0 * Math.random() - 1.0;
                    x2 = 2.0 * Math.random() - 1.0;
                    w  = x1 * x1 + x2 * x2;               
            } while( w >= 1.0);
            w = Math.sqrt((-2.0 * Math.log(w))/w);
            y1 = x1 * w;
            y2 = x2 * w;
            use_last = true;
        }

        var retval = mean + stdev * y1;
        if(retval > 0) 
            return retval;
        return -retval;
    }

}


export {padNum, locIDToArray, locArrayToLocId, makeGrid, genGauss}