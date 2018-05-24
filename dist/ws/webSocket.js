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

// wss.on('connection', function connection(ws) {
//
// });


wss.on('connection', function connection(ws) {

  ws.on('message', function incoming(data) {
    console.log('Roundtrip time: ' + Date.now() + ' ms');

    console.log('received:', data);
    ws.token = data;
  });

  ws.isAlive = true;

  ws.on('pong', heartbeat);

  ws.on('close', function close() {
    console.log('disconnected');
    _jsonwebtoken2.default.verify(ws.token, process.env.SECRET_KEY, function (err, token) {
      console.log("This client is disconnected");
      console.log(token);
      wss.clients.forEach(function (el) {
        el.send(JSON.stringify({ type: "message", message: "user id dead", token: token }));
      });
    });
  });
});

var interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) {
      _jsonwebtoken2.default.verify(ws.token, process.env.SECRET_KEY, function (err, token) {
        console.log("This client is dead");
        console.log(token);
        wss.clients.forEach(function (el) {
          el.send(JSON.stringify({ type: "message", message: "user id dead", token: token }));
        });
      });
      return ws.terminate();
    };
    ws.isAlive = false;
    ws.ping(noop);
    console.log(ws.token);
    console.log("he's alive");
  });
}, 15000);

exports.default = wss;