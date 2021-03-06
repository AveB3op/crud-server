import mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const clientSchema = new Schema(
  {
    "general": {
      "firstName": String,
      "lastName": String,
      "avatar": String
    },
    "job": {
      "company": String,
      "title": String
    },
    "contact": {
      "email": String,
      "phone": String
    },
    "address": {
      "street": String,
      "city": String,
      "zipCode": String,
      "country": String
    }
  }, {collection : 'Clients'});

export const userSchema = new Schema(
  {
    userName: String,
    password: String,
    email: String,
    role: String,
    token: String
  }, {collection : "Users"}
);
