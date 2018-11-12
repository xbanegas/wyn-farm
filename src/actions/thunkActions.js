// import TICK_WORLD from './types'

// export const tickWorld = () => ({
//   type: TICK_WORLD,
// })

import {moveDays} from './worldActions'
import {setHealth} from './playerActions'

export const playerHunger = () => {
  return (dispatch, getState)  => {
    if(getState().world.moveCount % 10 === 0) {
      dispatch(setHealth(-1))
    }
  }
}

export const tickWorld = () => {
  return(dispatch) => {
    dispatch(moveDays()),
    dispatch(playerHunger())
    }
  }
