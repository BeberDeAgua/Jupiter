var dotenv = require('dotenv');
dotenv.config();
const http = require('http');
const JSONbody = require('body/json');
const Body = require('body/form');
const Mongo = require('mongodb');
var url = "mongodb+srv://Joe:" + process.env.MONGOPASS + "@clu-ster-99b4b.azure.mongodb.net/test?retryWrites=true&w=majority";

const client = Mongo.MongoClient;
client.connect(url, (err, db) {
  const Codes = client.db("Jupiter").collection("Codes");
  
  const server = http.createServer(function(req, res) {
    var jsbody = JSONbody(req, res);
    var body = Body(req, res);
    
    console.log(jsbody)
  });
  
  client.close();
});
