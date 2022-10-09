const mongoose = require("mongoose");
const MongoDbContainer = require("../../persistence/mongoDbContainer");

const userSchema = new mongoose.Schema({
  email:{type: String, require:true, unique:true},
  name:{type: String, require:true},
  surname: {type:String, require:true},
  tel: {type:Number, require:true},
  password: {type:String, require:true},
  admin: {type:Boolean},
  currentCartId: {type:Number},
  address: {type:String}
})

let instance = null;

class DaoMongoDbUsers {
  constructor() {
    this.mongoClient = new MongoDbContainer("users",userSchema)
  }

  static getInstance(){
    if (!instance) instance = new DaoMongoDbUsers()
    return instance
  }

  /* async getAllUsers(){
    try{
      return await this.mongoClient.getAll()
    } catch(err) {
      console.log(err);
    }
  } */

  async addUser(user) {
    try{
      await this.mongoClient.save(user)
      return user
    } catch (err){
      console.log(err);
    }
  } 

  async findUser (email) {
    try{
      return await this.mongoClient.getById({email:email})
    } catch (err){
      console.log(err);
    }
  }
}

module.exports = DaoMongoDbUsers
