'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _db = require('./db/');

var _db2 = _interopRequireDefault(_db);

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

var _userRoutes = require('./routes/userRoutes');

var _userRoutes2 = _interopRequireDefault(_userRoutes);

var _webSocket = require('./ws/webSocket');

var _webSocket2 = _interopRequireDefault(_webSocket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(_express2.default.json());

app.use('/user', _user2.default);
app.use('/users', _userRoutes2.default);

console.log("start");

app.listen(process.env.SERVER_PORT, function () {
  console.log('Server started on ' + process.env.SERVER_PORT);
});