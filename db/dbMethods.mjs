import {clientSchema, userSchema} from './schema';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

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

export function addUser(userData){
  return bcrypt.hash(userData.password, saltRounds)
  .then(hash=>{
      userData.password = hash;
      let user = new User(userData);
      return user.save();
  })
  .catch(err=>{
    console.error(err);
  })
}
console.log(bcrypt.compareSync('42', '$2b$10$HoRWwfsxPXiL8qBBQZbA1.eEOk4QF/0QAiNbYWSlalTs//HXv6aEC'));

console.log(bcrypt.compareSync('872', '$2b$10$HoRWwfsxPXiL8qBBQZbA1.eEOk4QF/0QAiNbYWSlalTs//HXv6aEC'));
