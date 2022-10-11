const OrderDaoFactory = require("../daos/DaoFactoryOrder");

const daoFactory = OrderDaoFactory.getInstance()

const CartService = require("../../carts/service/CartService");
const cartService = new CartService(process.env.DATA_BASE_CARTS);
const UserService = require("../../users/service/UserService");
const userService = new UserService(process.env.DATA_BASE_USERS);

class OrderService {
  constructor(type) {
    this.orders = daoFactory.create(type)
  }

  async createNewOrder(order, user) {
    try{
      const orderId = await this.orders.createNewOrder(order)
      if(orderId) {
        await cartService.deleteCart(user.currentCartId)
        const newIdCart = await cartService.createCart(user.email, user.address)
        await userService.updateCurrentCartId(user.email, newIdCart)
        return orderId
      }
      return {error: "error processing the purchase"}
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