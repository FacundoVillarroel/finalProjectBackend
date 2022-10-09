const OrderDaoFactory = require("../daos/DaoFactoryOrder");

const daoFactory = OrderDaoFactory.getInstance()

class OrderService {
  constructor(type) {
    this.orders = daoFactory.create(type)
  }

  async createNewOrder(order) {
    try{
      return await this.orders.createNewOrder(order)
    } catch (err) {
      console.log(err);
    }
  }

  async getOrderById( id ) {
    try {
      const orderId = parseInt(id);
      if(isNaN(orderId)) return {error: "Id must be a number"}
      return await this.orders.getOrderById(orderId)
    } catch (err) {
      console.log(err)
    }
  }

  async deleteOrderById(id) {
    try {
      if( isNaN( parseInt(id) )) return {error: "Id must be a number"}
      return await this.orders.deleteOrderById(id)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = OrderService