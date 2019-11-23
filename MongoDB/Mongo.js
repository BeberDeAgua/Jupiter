var dotenv = require('dotenv');
dotenv.config();
const Mongo = require('mongodb');
var url = "mongodb+srv://Joe:" + process.env.MONGOPASS + "@clu-ster-99b4b.azure.mongodb.net/test?retryWrites=true&w=majority";

const client = new Mongo.MongoClient(url, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
