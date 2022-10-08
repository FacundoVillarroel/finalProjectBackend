const DaoMongoDbProduct = require("./DaoMongoDbProduct");

let instance = null;

class ProductDaoFactory{

  static getInstance(){
    if(!instance) instance = new ProductDaoFactory()
    return instance
  }

  create(type){
    switch(type){
      case "mongoDb": return DaoMongoDbProduct.getInstance()
    }
  }
  
}

module.exports = ProductDaoFactory