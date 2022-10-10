const DaoMongoDbMessages = require("./DaoMongoDbMessages")

let instance = null;

class MessagesDaoFactory{

  static getInstance() {
    if(!instance) instance = new MessagesDaoFactory()
    return instance
  }

  create(type) {
    switch(type){
      case "mongoDb": return DaoMongoDbMessages.getInstance()
    }
  }
}

module.exports = MessagesDaoFactory