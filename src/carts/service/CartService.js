const CartDaoFactory = require("../daos/DaoFactoryCarts");
const ProductService = require("../../products/service/ProductService")
const products = new ProductService(process.env.DATA_BASE_PRODUCTS)

const daoFactory = CartDaoFactory.getInstance();

class CartService {
  constructor(type){
    this.carts = daoFactory.create(type)
  }

  async getCart (id){
    try {
      return await this.carts.getCartById(id)
    } catch (err) {
      console.log(err);
    }
  }
  
  async createCart (email){
    try {
      const cart = {
        email:email,
        date: new Date(),
        products:[]
      }
      const cartCreated = await this.carts.createCart(cart)
      return cartCreated.id
    } catch (err) {
      console.log(err);
    }
  }

  async addProductToCart ( idCart, idProduct, quantity ){
    try {
      let product = await products.findProduct(idProduct)
      product.quantity = quantity
      let cart = await this.carts.getCartById(idCart)
      cart.products.push(product)
      await this.carts.modifyCart(idCart,cart)
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProductFromCart (idcart, idProduct){
    try {
      let cart = await this.carts.getCartById(idcart)
      const productsList = cart.products.filter(product => product.id !== idProduct)
      cart.products = productsList
      await this.carts.modifyCart(idcart, cart)
    } catch (err) {
      console.log(err);
    }
  }

  async deleteCart (id){
    try {
      await this.carts.deleteCart(id)
    } catch (err) {
      console.log(err);
    }
  }

}

module.exports = CartService