import express from 'express';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import { clientAdd, clientEdit, clientDelete } from '../ws/webSocketMethods';
import {getAllClients, addClient, deleteClient, editClient, getClient, searchClients, addUser, checkUser, findUser, addHash} from '../db/dbMethods';

const router = express.Router();
const secret = process.env.SECRET_KEY;

router.use((req, res, next)=>{
  console.log('user router');
  next();
});

router.use(expressJwt({ secret: secret}).unless({path: ['/user/signup', '/user/signin', /\/user\/get\/.*/i]}));

router.get("/get/all",(req, res) => {
    getAllClients()
    .then(clients=>{
      res.json(clients);
    })
    .catch(err=>{
      console.err(err);
    })
  console.log("Get clients");
});

router.post("/add", (req, res) => {
    addClient(req.body)
    .then(client=>{
      clientAdd(client);
      res.json(client);
    })
    .catch(err=>{
      console.error(err);
    });
});

router.get("/delete/:id",(req, res) => {
    if(req.user.role === "admin"){
      deleteClient(req.params.id)
      .then(response=>{
        clientDelete(req.params.id)
        res.send("deleted");
      })
      .catch(err=>{
        console.error(err);
      });
  }else{
    res.status('403').send("Must be admin");
  }
});

router.get("/get/id/:id",(req, res) => {
    getClient(req.params.id)
    .then(client=>{
      res.json(client);
    })
    .catch(err=>{
      console.error(err);
    });
});

router.post("/edit/:id",(req, res) => {
    editClient(req.params.id, req.body)
    .then(client=>{
      clientEdit(client);
      res.json(client);
    })
    .catch(err=>{
      console.error(err);
    });
});

router.get("/get/search/:filter",(req, res) => {
    let regExp = new RegExp('(^|.*)'+req.params.filter+'.*','i');
    searchClients(regExp)
    .then(clientsList=>{
      res.json(clientsList);
    })
    .catch(err=>{
      console.error(err);
    });
});

router.post("/signup",(req, res) => {
  addHash(req.body)
  .then(user=>{
    jwt.sign({email: user.email, role: user.role},secret,(err,token)=>{
      if(err){throw err}

      user.token = token;
      addUser(user)
      .then(newUser=>{
        return res.send(newUser.token);
      })

    });
  })
  .catch(err=>{
    console.error(err);
  })
});

router.post("/signin",(req, res) => {
  console.log(req.body);
  findUser(req.body)
  .then(user=>{
    checkUser(user, req.body.password).
    then(result => {
      console.log(result);
      if(result){
        console.log(result);
      res.status('200').send(result.token);
    }else{
      throw result;
    };
    })
    .catch(err=>{
      console.error(err);
      res.status(401).send("Authorization failed");
    })
  })
  .catch(err=>{
    console.error(err);
    res.status(401).send("Authorization failed");
  })
});


export default router;
