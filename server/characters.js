var mongo = require('mongodb');

var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('RPGZone', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'RPGZone' database");
    } else {
        console.log("Error connecting to 'RPGZone' database");
    }
});


exports.findAll = function(req, res) {
    db.collection('characters', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving character: ' + id);
    db.collection('characters', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.addCharacter = function(req, res) {
    var character = req.body;
    console.log('Adding character: ' + JSON.stringify(character));
    db.collection('characters', function(err, collection) {
        collection.insert(character, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};

exports.updateCharacter = function(req, res) {
    var id = req.params.id;
    var character = req.body;
    console.log('Updating character: ' + id);
    console.log(JSON.stringify(character));
    db.collection('characters', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, character, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating character: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(character);
            }
        });
    });
};

exports.deleteCharacter = function(req, res) {
    var id = req.params.id;
    console.log('Deleting character: ' + id);
    db.collection('characters', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};