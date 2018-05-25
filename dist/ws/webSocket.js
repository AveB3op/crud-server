'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wss = new _ws2.default.Server({ port: process.env.WS_PORT });

function noop() {}

function heartbeat() {
  this.isAlive = true;
}

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    console.log('Roundtrip time: ' + Date.now() + ' ms');
    console.log('received:', data);
    ws.token = data;
    _jsonwebtoken2.default.verify(ws.token, process.env.SECRET_KEY, function (err, token) {
      ws.send(JSON.stringify({ type: "connect", email: token.email }));
      wss.clients.forEach(function (el) {
        if (el.token !== ws.token && ws.token) {
          el.send(JSON.stringify({ type: "connected", message: "user is alive", token: token }));
        }
      });
    });
  });

  ws.isAlive = true;

  ws.on('pong', heartbeat);

  ws.on('close', function close() {
    if (ws.token) {
      _jsonwebtoken2.default.verify(ws.token, process.env.SECRET_KEY, function (err, token) {
        wss.clients.forEach(function (el) {
          el.send(JSON.stringify({ type: "disconnected", message: "user id dead", token: token }));
        });
      });
    }
  });
});

var interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    _jsonwebtoken2.default.verify(ws.token, process.env.SECRET_KEY, function (err, token) {
      if (ws.isAlive === false) {
        wss.clients.forEach(function (el) {
          el.send(JSON.stringify({ type: "disconnected", message: "user id dead", token: token }));
        });
        return ws.terminate();
      } else {
        wss.clients.forEach(function (el) {
          if (el.token !== ws.token && ws.token) {
            el.send(JSON.stringify({ type: "connected", message: "user is alive", token: token }));
          }
        });
      }
    });
    ws.isAlive = false;
    ws.ping(noop);
  });
}, 15000);

exports.default = wss;