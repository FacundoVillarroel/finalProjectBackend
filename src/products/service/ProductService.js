const ProductDaoFactory = require("../daos/DaoFactoryProduct");

const daoFactory = ProductDaoFactory.getInstance()

class ProductService{
  constructor(type){
    this.products = daoFactory.create(type)
  }

  async getAllProducts () {
    try {
      return await this.products.getAllProducts()
    } catch (err) {
      console.log(err);
    }
  }

  async findProduct (id) {
    try {
      const idNumber = parseInt(id)
      if(isNaN(idNumber)) return {error: "Id must be a number"}
      return await this.products.findProduct(id)
    } catch (err) {
      console.log(err);
    }
  }

  async getProductsByCategory(category){
    try {
      return await this.products.filterByCategory(category)
    } catch (err) {
      console.log(err);
    }
  }

  async addProduct (product) {
    try {
      await this.products.addProduct(product)
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProduct (id) {
    try {
      await this.products.deleteProduct(id)
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAllProducts () {
    try {
      await this.products.deleteAllProducts()
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ProductService