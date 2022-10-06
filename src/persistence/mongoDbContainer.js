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
}


module.exports = MongoDbContainer;