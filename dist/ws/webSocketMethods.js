'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clientAdd = clientAdd;
exports.clientEdit = clientEdit;
exports.clientDelete = clientDelete;

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

var _webSocket = require('./webSocket');

var _webSocket2 = _interopRequireDefault(_webSocket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function clientAdd(userData) {
  _webSocket2.default.clients.forEach(function each(client) {
    if (client.readyState === _ws2.default.OPEN) {
      client.send(JSON.stringify({ type: 'add', client: userData }));
    }
  });
}

function clientEdit(userData) {
  _webSocket2.default.clients.forEach(function each(client) {
    if (client.readyState === _ws2.default.OPEN) {
      client.send(JSON.stringify({ type: 'edit', client: userData }));
    }
  });
}

function clientDelete(id) {
  _webSocket2.default.clients.forEach(function each(client) {
    if (client.readyState === _ws2.default.OPEN) {
      client.send(JSON.stringify({ type: 'delete', id: id }));
    }
  });
}