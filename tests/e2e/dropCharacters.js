var db = require('../../server/database/database');

var collection = db.collection('characters');

exports.reset = function () {
    collection.drop();
};

exports.insert = function (characters) {
    collection.insert(characters);
};
