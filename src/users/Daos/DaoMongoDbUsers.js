const mongoose = require("mongoose");
const MongoDbContainer = require("../../persistence/mongoDbContainer");

const userSchema = new mongoose.Schema({
  email:{type: String, require:true, unique:true},
  name:{type: String, require:true},
  surname: {type:String, require:true},
  tel: {type:Number, require:true},
  password: {type:String, require:true},
  admin: {type:String},
  currentCartId: {type:Number}
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

  async addUser(user) {
    try{
      const newUser = this.mongoClient.collection(user)
      await newUser.save()
    } catch (err){
      console.log(err);
    }
  } 

  async findUser (email) {
    try{
      const user = (await this.mongoClient.collection.find({email:email}))[0]
      return user
    } catch (err){
      console.log(err);
    }
  }
}

module.exports = DaoMongoDbUsers
