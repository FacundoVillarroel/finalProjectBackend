const logger = require("../logs/logger");

class MemoryContainer {
  
  constructor(){
    this.idCounter = 0;
    this.array = [];
  }

  getAll() {
    try {
      return this.array
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  getById (id) {
    try {
      return this.array.find( item => item.id === id)
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

  modifyById(id, update) {
    try {
      let response = {modified: true, matched:true}
      const index = this.array.findIndex( item => item.id === id)
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