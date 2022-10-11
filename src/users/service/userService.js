const UsersDaoFactory = require("../daos/DaoFactoryUsers");

const daoFactory = UsersDaoFactory.getInstance()

class UserService {
  constructor(type){
    this.users = daoFactory.create(type)
  }

  async addNewUser (user) {
    try{
      await this.users.addUser(user)
    } catch(error) {
      console.log(error);
    }
  }
  
  async findUser (email) {
    return await this.users.findUser(email)
  }

  async updateCurrentCartId(email, idCart){
    try {
      await this.users.modifyUser(email, {currentCartId: idCart})
    } catch (err) {
      console.log(err);
    }
  }

  async getAllUsers() {
    try{
      return await this.users.getAllUsers()
    } catch(err){
      console.log(err);
    }
  }
}

module.exports = UserService