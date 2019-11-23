var dotenv = require('dotenv');
dotenv.config();
const http = require('http');
const JSONbody = require('body/json');
const Body = require('body/form');
const Mongo = require('mongodb');
var url = "mongodb+srv://Joe:" + process.env.MONGOPASS + "@clu-ster-99b4b.azure.mongodb.net/test?retryWrites=true&w=majority";

const client = new Mongo.MongoClient(url, { useUnifiedTopology: true });
client.connect(url, function(err, db) {
  if (err) throw err;
  const Codes = client.db("Jupiter").collection("Codes");
  
  const server = http.createServer(function(req, res) {
    var jsbody = yield JSONbody(req, res);
    var body = yield Body(req, res);
    
    console.log(jsbody)
  });
  
  client.close();
});
