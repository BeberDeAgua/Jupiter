var dotenv = require('dotenv');
dotenv.config();
const http = require('http');
const https = require('https');
const JSONbody = require('body/json');
const Body = require('body/form');
const Mongo = require('mongodb').MongoClient;
var url = "mongodb+srv://Joe:" + process.env.MONGOPASS + "@clu-ster-99b4b.azure.mongodb.net/test?retryWrites=true&w=majority";
           
function DatabaseSave(db, thingToSave) {
  db.findOne({_id: thingToSave['_id']}, function(err, res) {
    if (err) {console.log(err)};
    if (res) {
      console.log('Already saved.');
    }else {
      db.insertOne({_id: thingToSave['_id'], discordUser: thingToSave.discordUser, code: thingToSave.code}, function(err, res) {
        if (err) throw err;
        console.log("Save successful!");
       // db.close();
      });
      
    };
  });
};
               
async function DatabaseGet(db, thingToGet) {
  db.findOne(thingToGet, function(err, res) {
    if (err) throw err;
    //console.log(res);
    return res;
  });
};

function generateCode() {
   return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
};

Mongo.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
  if (err) throw err;
  client.connect();
  const DB = client.db("Jupiter");
  const Codes = DB.collection("Codes");
  
  const server = http.createServer(function(request, response) {
   // console.dir(request.param);

    if (request.method == 'GET') {
      console.log('GET');
      response.writeHead(200, {'Content-Type': 'application/json'});
      
      var owo = ''
      DatabaseGet(Codes, {_id : request.headers.id}).then(function(result) { owo = result;});
      
      console.log(owo);
      response.end(JSON.stringify(owo))
      
    }else if (request.method == 'POST') {
      console.log('POST');
      var body = '';
      request.on('data', chunk => {
          body += chunk.toString();
      });
      request.on('end', () => {
        console.log(body);
        response.end('ok');
        var table = JSON.parse(body)
        if (table.thing) {
          console.log(table.thing);
          response.writeHead(200, {'Content-Type': 'application/json'});
          var options = {host: 'auth.roblox.com', path: '/v1/usernames?username=' + table.thing};
          console.log(options.path);
          var req = https.get(options, function(r) {
             r.on('data', owo => {
               console.log(owo.toString());
               var object = JSON.parse(owo);
               console.log(Object.entries(object.usernames).length);
               var uwu = generateCode()
               if (Object.entries(object.usernames).length === 1) {
                 console.log(uwu);
                 DatabaseSave(Codes, {'_id': table.thing, discordUser: table.discName, code: uwu})
                 
               }else console.log("No user found!")
               
             })
          });
         
          
          req.end();

         
        };
        });
    };
    client.close()
  });
  
 server.listen(process.env.PORT);
 
});



