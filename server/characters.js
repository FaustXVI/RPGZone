var characters = require('./database/characterDAO');

exports.all = function (req, res) {
    characters.all(function (err, items) {
        res.send(items);
    });
};

exports.get = function (req, res) {
    var id = req.params.id;
    console.info('Retrieving character: ' + id);
    characters.get(id, function (err, item) {
        res.send(item);
    });
};

exports.add = function (req, res) {
    var character = req.body;
    console.info('Adding character: ' + JSON.stringify(character));
    characters.add(character, function (err, result) {
        if (err) {
            res.send({'error': 'An error has occurred'});
        } else {
            console.info('Success: ' + JSON.stringify(result[0]));
            res.send(result[0]);
        }
    });
};

exports.update = function (req, res) {
    var id = req.params.id;
    var character = req.body;
    console.info('Updating character: ' + id);
    console.info(JSON.stringify(character));
    characters.update(id, character, function (err, result) {
        if (err) {
            console.error('Error updating character: ' + err);
            res.send({'error': 'An error has occurred'});
        } else {
            console.info('' + result + ' document(s) updated');
            res.send(character);
        }
    });
};

exports.suppress = function (req, res) {
    var id = req.params.id;
    console.info('Deleting character: ' + id);
    characters.suppress(id, function (err, result) {
        if (err) {
            res.send({'error': 'An error has occurred - ' + err});
        } else {
            console.info('' + result + ' document(s) deleted');
            res.send(req.body);
        }
    });
};