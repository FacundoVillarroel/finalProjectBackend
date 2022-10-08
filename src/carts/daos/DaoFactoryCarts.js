const DaoMongoDbCarts = require("./DaoMongoDbCarts");

let instance = null;

class CartDaoFactory {

  static getInstance(){
    if(!instance) instance = new CartDaoFactory()
    return instance
  }

  create(type){
    switch(type){
      case "mongoDb": return DaoMongoDbCarts.getInstance()
    }
  }
  
}

module.exports = CartDaoFactory