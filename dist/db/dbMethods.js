'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllClients = getAllClients;
exports.addClient = addClient;
exports.editClient = editClient;
exports.deleteClient = deleteClient;
exports.getClient = getClient;
exports.searchClients = searchClients;
exports.addHash = addHash;
exports.addUser = addUser;
exports.findUser = findUser;
exports.checkUser = checkUser;
exports.getAllUsers = getAllUsers;

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = require('./schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saltRounds = 10;

var Client = _mongoose2.default.model('Client', _schema.clientSchema);
var User = _mongoose2.default.model('User', _schema.userSchema);

function getAllClients() {
  return Client.find({});
}

function addClient(clientData) {
  var client = new Client(clientData);
  return client.save();
}

function editClient(id, client) {
  return Client.findByIdAndUpdate(id, client, { new: true });
}

function deleteClient(id) {
  return Client.findByIdAndDelete(id);
}

function getClient(id) {
  return Client.findById(id);
}

function searchClients(searchFilter) {
  return Client.find({ $or: [{ 'general.firstName': searchFilter }, { 'general.lastName': searchFilter }] });
}

function addHash(userData) {
  return _bcrypt2.default.hash(userData.password, saltRounds).then(function (hash) {
    userData.password = hash;
    userData.role = "user";
    return userData;
  });
}

function addUser(userData) {
  var user = new User(userData);
  return user.save();
}

function findUser(userData) {
  return User.findOne({ email: userData.email });
}

function checkUser(user, password) {

  return _bcrypt2.default.compare(password, user.password).then(function (result) {
    if (result) {
      return user;
    } else {
      throw result;
    }
  }).catch(function (err) {
    console.error(err);
  });
}

function getAllUsers() {
  return User.find({});
}