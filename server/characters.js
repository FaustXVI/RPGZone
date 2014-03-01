var db = require('./database/database');
var BSON = require('mongodb').BSONPure;

exports.findAll = function (req, res) {
    db.collection('characters', function (err, collection) {
        collection.find().toArray(function (err, items) {
            res.send(items);
        });
    });
};

exports.findById = function (req, res) {
    var id = req.params.id;
    console.info('Retrieving character: ' + id);
    db.collection('characters', function (err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id)}, function (err, item) {
            res.send(item);
        });
    });
};

exports.addCharacter = function (req, res) {
    var character = req.body;
    console.info('Adding character: ' + JSON.stringify(character));
    db.collection('characters', function (err, collection) {
        collection.insert(character, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                console.info('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};

exports.updateCharacter = function (req, res) {
    var id = req.params.id;
    var character = req.body;
    character._id = new BSON.ObjectID(id);
    console.info('Updating character: ' + id);
    console.info(JSON.stringify(character));
    db.collection('characters', function (err, collection) {
        collection.update({'_id': new BSON.ObjectID(id)}, character, {safe: true}, function (err, result) {
            if (err) {
                console.error('Error updating character: ' + err);
                res.send({'error': 'An error has occurred'});
            } else {
                console.info('' + result + ' document(s) updated');
                res.send(character);
            }
        });
    });
};

exports.deleteCharacter = function (req, res) {
    var id = req.params.id;
    console.info('Deleting character: ' + id);
    db.collection('characters', function (err, collection) {
        collection.remove({'_id': new BSON.ObjectID(id)}, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred - ' + err});
            } else {
                console.info('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};