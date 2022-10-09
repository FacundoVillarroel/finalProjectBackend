const DaoMongoDbOrders = require("./DaoMongoDbOrders");

let instance = null; 

class OrderDaoFactory{

  static getInstance() {
    if(!instance) instance = new OrderDaoFactory()
    return instance
  }

  create(type){
    switch(type){
      case "mongoDb": return DaoMongoDbOrders.getInstance()
    }
  }
}

module.exports = OrderDaoFactory