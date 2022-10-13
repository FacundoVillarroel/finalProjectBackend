const logger = require("../logs/logger");

class MemoryContainer {
  
  constructor(){
    this.idCounter = 0;
    this.array = [{"_id":"63457bf5aab362bd94a2adcb","email":"test@gmail.com","name":"Test","surname":"first","tel":12345678,"password":"$2b$10$sUATkgPFh/nHUKCLrmi1Be.RLg8ZYl/fN2yb67s0bbRq3MpOdNJHa","currentCartId":2,"address":"Av. siempreviva","__v":0}]
  }

  getAll() {
    try {
      return this.array
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  getBy (searchParam,id) {
    try {
      return this.array.find( item => item[searchParam] === id)
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  save( item ) {
    try {
      item.id = this.idCounter + 1;
      this.idCounter ++;
      this.array.push(item)
      return item
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  getByProperty(propertyName, propertyValue ){
    try {
      return this.array.filter( item => item[propertyName] === propertyValue)
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  modifyBy(searchParam, id, update) {
    try {
      let response = {modified: true, matched:true}
      const index = this.array.findIndex( item => item[searchParam] === id)
      if(index === -1) response.matched = false
      this.array[index] = {...update, id:id}
      return response
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  deleteById( id ) {
    try {
      this.array = this.array.filter( item => item.id !== id)
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  deleteAll () {
    try {
      this.array = []
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }
}

module.exports = MemoryContainer