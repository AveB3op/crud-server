import express from 'express';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import { clientAdd, clientEdit, clientDelete } from '../ws/webSocketMethods';
import { getAllUsers } from '../db/dbMethods';

const userRouter = express.Router();
const secret = process.env.SECRET_KEY;

userRouter.use((req, res, next)=>{
  console.log('users userRouter');
  next();
});

userRouter.use(expressJwt({ secret: secret}).unless({path: [/\/users\/get\/.*/i]}));

userRouter.get("/get/all",(req, res) => {
    getAllUsers()
    .then(users=>{
      res.json(users.map((user)=>{
        return {email: user.email, role: user.role, userName:user.userName}
      }));
    })
    .catch(err=>{
      console.err(err);
    })
  console.log("Get clients");
});



export default userRouter;
