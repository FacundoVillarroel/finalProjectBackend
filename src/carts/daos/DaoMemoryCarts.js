const MemoryContainer = require ("../../persistence/MemoryContainer");
const logger = require("../../logs/logger");

let instance = null;

class DaoMemoryCarts {
  constructor(){
    this.memoryClient = new MemoryContainer ();
  }

  static getInstance () {
    if (!instance) instance = new DaoMemoryCarts();
    return instance
  }

  getCartById(id){
    try {
      return this.memoryClient.getById( id )
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  createCart(cart){
    try {
      return this.memoryClient.save( cart )
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  modifyCart( id, cartUpdate ){
    try {
      return this.memoryClient.modifyById( id, cartUpdate)
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  deleteCart(id){
    try {
      this.memoryClient.deleteById( id )
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

}

module.exports = DaoMemoryCarts