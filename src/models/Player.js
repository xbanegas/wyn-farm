export default class Player {
  constructor() {
    this.id = "298323"
    this.location = ""
    this.name = "kidA"
    this.hunger = 0
    this.health = 10
    this.coins = 0
    this.inventory = [
      {
          "name": "wood",
          "count": 0
      },
      {
          "name": "carrot",
          "count": 0
      },
      {
          "name": "wall",
          "count": 0
      }
    ]
    this.itemSelected = 0
  }
}