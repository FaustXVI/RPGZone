var mongo = require('mongodb');

var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('RPGZone', server);

db.open(function (err) {
    if (!err) {
        console.log("Connected to 'RPGZone' database");
    } else {
        console.log("Error connecting to 'RPGZone' database");
    }
});

module.exports = db;