const MessagesDaoFactory = require ("../daos/DaoFactoryMessages");

const daoFactory = MessagesDaoFactory.getInstance()

class MessagesService {
  constructor(type) {
    this.messages = daoFactory.create(type)
  }

  async addMessage (message) {
    try {
      return await this.messages.addMessage(message)
    } catch (err) {
      console.log(err);
    }
  }

  async getAllMessages() {
    try {
      return await this.messages.getAllMessages()
    } catch (err) {
      console.log(err);
    }
  }

  async getMessagesByEmail(email) {
    try {
      return await this.messages.getMessagesByEmail(email)
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = MessagesService