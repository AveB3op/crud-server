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

app.get("/getClients",(req, res) => {
  Client.find({},(err,clients)=>{
      res.json(clients);
    });
  console.log("Get clients");
});

app.post("/addClient", (req, res) => {
  let client = new Client(req.body);
  client.save((err,client)=>{
    if(err){return  console.error(err);}
    res.json(req.body);
  });
});

app.get("/deleteClient/:id",(req, res) => {
  Client.findByIdAndDelete(req.params.id,(err)=>{
    if(err) return console.error(err);
    res.send("deleted");
  })
});

app.get("/getClient/:id",(req, res) => {
  console.log(req.params.id);
  Client.findById(req.params.id,(err,client)=>{
    if(err) return console.error(err);
    console.log(client);
    res.json(client);
  })
});

app.post("/editClient/:id",(req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  Client.findByIdAndUpdate(req.params.id,req.body,(err)=>{
    if(err) console.error(err);
    res.json(req.body);
  });
});

//TODO
app.get("/user/search/:filter",(req, res) => {
  console.log("test");
  console.log(req.params.filter);
  Client.find({general:{name: req.params.filter} }, (err, clientsList)=>{
    if(err) console.log(err);
    console.log(clientsList);
    res.json(clientsList);
  })
});
//TODO


app.listen("8080",()=>{
  console.log("Server started on :8080");
});
