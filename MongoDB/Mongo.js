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
   // console.dir(request.param);

    if (request.method == 'GET') {
      console.log('GET');
      if (request.ID) {
        response.writeHead(200, {'Content-Type': 'application/json'});
        var thingy = DatabaseGet(Codes, request.ID)
        if (thingy) {
          response.end();
        };
      };
    }else if (request.method == 'POST') {
      console.log('POST');
      let body = '';
      request.on('data', chunk => {
           body += chunk.toString(); // convert Buffer to string
      });
      request.on('end', () => {
           console.log(body);
           res.end('ok');
      });
      //var table = JSON.stringify(request)
      var
      if (table) {
        console.log(table.thing);
        response.writeHead(200, {'Content-Type': 'application/json'});
        options = {method: 'HEAD', host: 'roblox.com', path: '/users/' + JSON.stringify(table.thing)},
        req = http.request(options, function(r) {
           console.log(JSON.stringify(r.headers));
        });
        DatabaseSave(Codes, request.Thing)  
      };
      request.end();
    };
    
  });
  
 server.listen(process.env.PORT);
  
  client.close();
});



