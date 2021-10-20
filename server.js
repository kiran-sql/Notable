const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();

app.use(bodyParser.urlencoded({extended:true}))
require('./app/routes')(app,{});


port = 5000;


MongoClient.connect(db.url, (err, database) => {
 if(err){
  console.log(err);
 }
 const myDatabase = database.db('notes');
 myDatabase.collection('notes');
 require('./app/routes')(app,database)
 app.listen(port,() => {
 console.log("Listening to port "+ port);
});
})