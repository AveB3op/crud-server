import express from 'express';
import db from './db/';
import router from './routes/user';
import wss from './ws/webSocket';

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.use('/user',router);

app.listen("8080",()=>{
  console.log("Server started on :8080");
});
