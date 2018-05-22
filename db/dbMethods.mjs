import {clientSchema} from './schema';
import mongoose from 'mongoose';

const Client = mongoose.model('Client',clientSchema);

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
