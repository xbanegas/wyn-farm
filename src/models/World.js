export default class World {
  constructor(){
    this.instructions = 0
    this.instructionsStyle = [{"display": "none"},{"display": "block"}]
    this.size = 10
    this.dayCount = 0
    this.dayInterval = 24
    this.moveCount = 0
    this.grid = []
    this.trees = {
      total: 10,
      trees: []
    }
    this.carrots = {
      total: 3,
      carrots: []
    }
    this.wallLocs = []
    this.creeps = {
      total: 3,
      creeps: [],
      locs: [],
    }
  }
}