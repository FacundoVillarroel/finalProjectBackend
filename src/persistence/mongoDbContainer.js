const mongoose = require ("mongoose");

class MongoDbContainer {

  constructor(collection, prodSchema) {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Conectado a DB de mongo");
    this.collection = mongoose.model(collection, prodSchema);
  }

  async getAll(){
    try{
      return await this.collection.find()
    } catch(err){
      console.log(err);
    }
  }

  async save(item){
    try { 
      const itemToAdd = new this.collection(item)
      await itemToAdd.save()
      return(item)
    } catch (err) {
      console.log(err);
    }
  }

  async getById(id) {
    try {
      return (await this.collection.find(id))[0]
    } catch (err) {
      console.log(err);
    }
  }

  async getByProperty(property) {
    try {
      return (await this.collection.find(property))
    } catch (err) {
      console.log(err);
    }
  }

  async modifyById(id,update) {
    try{
      await this.collection.updateOne({id:id},{$set:{...update}})
    } catch(err){
      console.log(err);
    }
  }

  async deleteById(id){
    try{
      await this.collection.deleteOne(id)
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAll(){
    try {
      await this.collection.deleteMany()
    } catch (err) {
      console.log(err);
    }
  }
}


module.exports = MongoDbContainer;