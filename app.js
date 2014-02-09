var express = require('express');
var characters = require('./server/characters');
var app = express();

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/public'));
});

app.get('/characters', characters.findAll);
app.get('/characters/:id', characters.findById);
app.post('/characters', characters.addCharacter);
app.put('/characters/:id', characters.updateCharacter);
app.delete('/characters/:id', characters.deleteCharacter);

app.listen(8080);
console.log('Listening on port 8080');