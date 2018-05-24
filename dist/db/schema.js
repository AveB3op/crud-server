"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userSchema = exports.clientSchema = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var clientSchema = exports.clientSchema = new Schema({
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
}, { collection: 'Clients' });

var userSchema = exports.userSchema = new Schema({
  userName: String,
  password: String,
  email: String,
  role: String,
  token: String
}, { collection: "Users" });