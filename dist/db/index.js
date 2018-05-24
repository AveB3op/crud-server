'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
_mongoose2.default.connect('mongodb://' + process.env.DB_HOST + '/CRUD');

var db = _mongoose2.default.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("DB connected"); // we're connected!
});

exports.default = db;