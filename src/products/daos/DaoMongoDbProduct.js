const mongoose = require("mongoose");
const MongoDbContainer = require("../../persistence/mongoDbContainer");

const productSchema = new mongoose.Schema({
  id:{type:Number, require:true, unique:true},
  title:{type:String, require:true},
  price:{type:Number, require:true},
  thumbnail:{type:String, require:true},
  description:{type:String, require:true},
  category:{type:String, require:true}
})

let instance = null;

class DaoMongoDbProduct {

  constructor() {
    this.idCounter = 1
    this.mongoClient = new MongoDbContainer("products", productSchema);
  }

  static getInstance(){
    if(!instance) instance = new DaoMongoDbProduct();
    return instance
  }

  async getAllProducts () {
    try{
      return await this.mongoClient.getAll()
    } catch (err) {
      console.log(err);
    }
  }

  async addProduct(product) {
    try{
      const allProducts = await this.mongoClient.getAll()
      if (allProducts.length !== 0){
        allProducts.forEach(item => {
          if (this.idCounter <= item.id ) this.idCounter = item.id + 1;
        });
      }
      console.log("ID COUNTER",this.idCounter);
      product.id = this.idCounter
      console.log(product);
      await this.mongoClient.save(product)
    } catch(err) {
      console.log(err);
    }
  }

  async findProduct(id){
    try{
      return await this.mongoClient.getById({id:id})
    } catch(err) {
      console.log(err);
    }
  }

  async filterByCategory(category){
    try {
      return await this.mongoClient.getByProperty({category:category})
    } catch (err) {
      console.log(err)
    }
  }

  async deleteProduct(id) {
    try {
      await this.mongoClient.deleteById({id:id})
    } catch (err) {
      console.log(err)
    }
  }

  async deleteAllProducts() {
    try {
      await this.mongoClient.deleteAll()
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = DaoMongoDbProduct