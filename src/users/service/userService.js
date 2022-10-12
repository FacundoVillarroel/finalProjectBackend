const UsersDaoFactory = require("../daos/DaoFactoryUsers");
const logger = require("../../logs/logger");

const daoFactory = UsersDaoFactory.getInstance()

class UserService {
  constructor(type){
    this.users = daoFactory.create(type)
  }

  async addNewUser (user) {
    try{
      await this.users.addUser(user)
    } catch(error) {
      logger.error(`Error: ${err}`)
    }
  }
  
  async findUser (email) {
    try {
      return await this.users.findUser(email)
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async updateCurrentCartId(email, idCart){
    try {
      await this.users.modifyUser(email, {currentCartId: idCart})
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async getAllUsers() {
    try{
      return await this.users.getAllUsers()
    } catch(err){
      logger.error(`Error: ${err}`)
    }
  }
}

module.exports = UserService