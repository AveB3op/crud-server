import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import {clientSchema, userSchema} from './schema';

const saltRounds = 10;

const Client = mongoose.model('Client',clientSchema);
const User = mongoose.model('User',userSchema);

export function getAllClients(){
  return Client.find({});
}

export function addClient(clientData){
  let client = new Client(clientData);
  return client.save();
}

export function editClient(id, client){
  return Client.findByIdAndUpdate(id, client,{new:true});
}

export function deleteClient(id){
  return Client.findByIdAndDelete(id);
}

export function getClient(id){
  return Client.findById(id);
}

export function searchClients(searchFilter){
  return Client.find({$or:[{'general.firstName': searchFilter},{'general.lastName': searchFilter}]})
}

export function addHash(userData){
  return bcrypt.hash(userData.password, saltRounds)
  .then(hash=>{
       userData.password = hash;
       userData.role = "user";
       return userData;
      });
  }


export function addUser(userData){
    let user = new User(userData);
    return user.save();
}

export function findUser(userData){
  return User.findOne({email:userData.email});
}

export function checkUser(user, password){

  return bcrypt.compare(password, user.password)
  .then(result=>{
      if(result){return user}
      else{ throw result}
  })
  .catch(err=>{
    console.error(err);
  })
}
