import express from 'express';
import {getAllClients, addClient, deleteClient, editClient, getClient, searchClients} from '../db/dbMethods';

const router = express.Router();

router.use((req, res, next)=>{
  console.log('user router');
  next();
});

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
      res.json(client);
    })
    .catch(err=>{
      console.error(err);
    });
});

router.get("/delete/:id",(req, res) => {
    deleteClient(req.params.id)
    .then(response=>{
      res.send("deleted");
    })
    .catch(err=>{
      console.error(err);
    });
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
      res.json(client);
    })
    .catch(err=>{
      console.error(err);
    });
});

router.get("/search/:filter",(req, res) => {
    let regExp = new RegExp('(^|.*)'+req.params.filter+'.*','i');
    searchClients(regExp)
    .then(clientsList=>{
      res.json(clientsList);
    })
    .catch(err=>{
      console.error(err);
    });
});

export default router;
