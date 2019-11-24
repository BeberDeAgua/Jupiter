var dotenv = require('dotenv');
dotenv.config();
const http = require('http');
const JSONbody = require('body/json');
const Body = require('body/form');
const Mongo = require('mongodb').MongoClient;
var url = "mongodb+srv://Joe:" + process.env.MONGOPASS + "@clu-ster-99b4b.azure.mongodb.net/test?retryWrites=true&w=majority";
           
function DatabaseSave(db, thingToSave) {
  db.insertOne(thingToSave, function(err, res) {
    if (err) throw err;
    console.log(res);
  });
};
               
function DatabaseGet(db, thingToGet) {
  db.findOne(thingToGet, function(err, res) {
    if (err) throw err;
    return res;
  });
};

Mongo.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
  if (err) throw err;
  const DB = client.db("Jupiter");
  const Codes = DB.collection("Codes");
  
  const server = http.createServer(function(request, response) {
    console.dir(request.param);

    if (request.method == 'GET') {
      console.log('GET');
      if (request.ID) {
        response.writeHead(200, {'Content-Type': 'application/json'});
        var thingy = DatabaseGet(Codes, request.ID)
        if (thingy) {
          response.end();
        };
      };
    } ;
    
  });
  
  client.close();
});


server.listen(process.env.PORT);
