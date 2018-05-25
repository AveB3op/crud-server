'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _webSocketMethods = require('../ws/webSocketMethods');

var _dbMethods = require('../db/dbMethods');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRouter = _express2.default.Router();
var secret = process.env.SECRET_KEY;

userRouter.use(function (req, res, next) {
  console.log('users userRouter');
  next();
});

userRouter.use((0, _expressJwt2.default)({ secret: secret }).unless({ path: [/\/users\/get\/.*/i] }));

userRouter.get("/get/all", function (req, res) {
  (0, _dbMethods.getAllUsers)().then(function (users) {
    res.json(users.map(function (user) {
      return { email: user.email, role: user.role, userName: user.userName };
    }));
  }).catch(function (err) {
    console.err(err);
  });
  console.log("Get clients");
});

exports.default = userRouter;