const UsersDaoFactory = require("../Daos/DaoFactoryUsers");

const daoFactory = UsersDaoFactory.getInstance()

class UserService {
  constructor(type){
    this.users = daoFactory.create(type)
  }

  async addNewUser (user) {
    try{
      this.users.addUser(user)
    } catch(error) {
      console.log(error);
    }
  }
  
  async findUser (email) {
    return await this.users.findUser(email)
  }
}

module.exports = UserService