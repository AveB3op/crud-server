import express from 'express';
import mongoose from 'mongoose';
import {clientSchema} from './schema'


const Client = mongoose.model('Client',clientSchema);
const ObjectId = mongoose.Types.ObjectId;


mongoose.connect('mongodb://localhost/CRUD');

const db = mongoose.connection;
const app = express();

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("DB connected");// we're connected!
});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.get("/user/get/all",(req, res) => {
  Client.find({},(err,clients)=>{
      res.json(clients);
    });
  console.log("Get clients");
});

app.post("/user/add", (req, res) => {
  let client = new Client(req.body);
  client.save((err,client)=>{
    if(err){return  console.error(err);}
    res.json(client);
  });
});

app.get("/user/delete/:id",(req, res) => {
  Client.findByIdAndDelete(req.params.id,(err)=>{
    if(err) return console.error(err);
    res.send("deleted");
  })
});

app.get("/user/get/id/:id",(req, res) => {
  console.log(req.params.id);
  Client.findById(req.params.id,(err,client)=>{
    if(err) return console.error(err);
    console.log(client);
    res.json(client);
  })
});

app.post("/user/edit/:id",(req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  Client.findByIdAndUpdate(req.params.id,req.body,(err)=>{
    if(err) console.error(err);
    res.json(req.body);
  });
});

//TODO
app.get("/user/search/:filter",(req, res) => {
  let regExp = new RegExp('(^|.*)'+req.params.filter+'.*','i');

  Client.find({$or:[{'general.firstName': regExp},{'general.lastName': regExp}]}, (err, clientsList)=>{
    if(err) console.log(err);
    console.log(clientsList);
    res.json(clientsList);
  })
});
//TODO


app.listen("8080",()=>{
  console.log("Server started on :8080");
});
