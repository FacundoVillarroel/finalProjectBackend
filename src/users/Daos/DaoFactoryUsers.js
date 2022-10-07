const DaoMongoDbUsers = require("./DaoMongoDbUsers")

let instance = null;

class UsersDaoFactory{
  
  static getInstance() {
    if(!instance) instance = new UsersDaoFactory()
    return instance
  }

  create(type) {
    switch(type){
      case "mongoDb": return DaoMongoDbUsers.getInstance()
    }
  }
}

module.exports = UsersDaoFactory