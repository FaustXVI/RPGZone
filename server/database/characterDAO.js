var db = require('./database');
var BSON = require('mongodb').BSONPure;

var characters = db.collection('characters');

exports.all = function (callback) {
    characters.find().toArray(callback);
};

exports.get = function (id, callback) {
    characters.findOne({'_id': new BSON.ObjectID(id)}, callback);
};

exports.add = function (character, callback) {
    characters.insert(character, {safe: true}, callback);
};

exports.update = function (id, character, callback) {
    character._id = new BSON.ObjectID(id);
    characters.update({'_id': character._id}, character, {safe: true}, callback);
};

exports.suppress = function (id, callback) {
    characters.remove({'_id': new BSON.ObjectID(id)}, {safe: true}, callback);
};