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

var router = _express2.default.Router();
var secret = process.env.SECRET_KEY;

router.use(function (req, res, next) {
  console.log('user router');
  next();
});

router.use((0, _expressJwt2.default)({ secret: secret }).unless({ path: ['/user/signup', '/user/signin', /\/user\/get\/.*/i] }));

router.get("/get/all", function (req, res) {
  (0, _dbMethods.getAllClients)().then(function (clients) {
    res.json(clients);
  }).catch(function (err) {
    console.err(err);
  });
  console.log("Get clients");
});

router.post("/add", function (req, res) {
  (0, _dbMethods.addClient)(req.body).then(function (client) {
    (0, _webSocketMethods.clientAdd)(client);
    res.json(client);
  }).catch(function (err) {
    console.error(err);
  });
});

router.get("/delete/:id", function (req, res) {
  if (req.user.role === "admin") {
    (0, _dbMethods.deleteClient)(req.params.id).then(function (response) {
      (0, _webSocketMethods.clientDelete)(req.params.id);
      res.send("deleted");
    }).catch(function (err) {
      console.error(err);
    });
  } else {
    res.status('403').send("Must be admin");
  }
});

router.get("/get/id/:id", function (req, res) {
  (0, _dbMethods.getClient)(req.params.id).then(function (client) {
    res.json(client);
  }).catch(function (err) {
    console.error(err);
  });
});

router.post("/edit/:id", function (req, res) {
  (0, _dbMethods.editClient)(req.params.id, req.body).then(function (client) {
    (0, _webSocketMethods.clientEdit)(client);
    res.json(client);
  }).catch(function (err) {
    console.error(err);
  });
});

router.get("/get/search/:filter", function (req, res) {
  var regExp = new RegExp('(^|.*)' + req.params.filter + '.*', 'i');
  (0, _dbMethods.searchClients)(regExp).then(function (clientsList) {
    res.json(clientsList);
  }).catch(function (err) {
    console.error(err);
  });
});

router.post("/signup", function (req, res) {
  (0, _dbMethods.addHash)(req.body).then(function (user) {
    _jsonwebtoken2.default.sign({ email: user.email, role: user.role }, secret, function (err, token) {
      if (err) {
        throw err;
      }

      user.token = token;
      (0, _dbMethods.addUser)(user).then(function (newUser) {
        return res.send(newUser.token);
      });
    });
  }).catch(function (err) {
    console.error(err);
  });
});

router.post("/signin", function (req, res) {
  console.log(req.body);
  (0, _dbMethods.findUser)(req.body).then(function (user) {
    (0, _dbMethods.checkUser)(user, req.body.password).then(function (result) {
      console.log(result);
      if (result) {
        console.log(result);
        res.status('200').send(result.token);
      } else {
        throw result;
      };
    }).catch(function (err) {
      console.error(err);
      res.status(401).send("Authorization failed");
    });
  }).catch(function (err) {
    console.error(err);
    res.status(401).send("Authorization failed");
  });
});

exports.default = router;