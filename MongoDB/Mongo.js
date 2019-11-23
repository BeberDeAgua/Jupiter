var dotenv = require('dotenv');
dotenv.config();
const http = require('http');
const JSONbody = require('body/json');
const Body = require('body/form');
const Mongo = require('mongodb').MongoClient;
var url = "mongodb+srv://Joe:" + process.env.MONGOPASS + "@clu-ster-99b4b.azure.mongodb.net/test?retryWrites=true&w=majority";



Mongo.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
  if (err) throw err;
  const DB = client.db("Jupiter");
  const Codes = DB.collection("Codes");
  
  client.close();
});

const server = http.createServer(function(req, res) {
    var jsbody = JSONbody(req, res);
    var body = Body(req, res);
    
    console.log(jsbody)
});
